pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PredictMarket {
    address public owner;
    IERC20 public usdc;
    uint256 public feePercent = 3;

    struct Market {
        string question;
        uint256 deadline;
        uint256 yesPool;
        uint256 noPool;
        bool resolved;
        bool outcome;
    }

    Market[] public markets;
    mapping(uint256 => mapping(address => uint256)) public userBets;

    constructor(address _usdc) {
        owner = msg.sender;
        usdc = IERC20(_usdc);
    }

    function createMarket(string memory question, uint256 deadline) external {
        markets.push(Market(question, deadline, 0, 0, false, false));
    }

    function placeBet(uint256 marketId, bool isYes, uint256 amount) external {
        Market storage m = markets[marketId];
        require(block.timestamp < m.deadline);

        uint256 fee = (amount * feePercent) / 100;
        uint256 netAmount = amount - fee;

        usdc.transferFrom(msg.sender, address(this), amount);
        usdc.transfer(owner, fee);

        if (isYes) m.yesPool += netAmount;
        else m.noPool += netAmount;

        userBets[marketId][msg.sender] += netAmount;
    }

    function resolve(uint256 marketId, bool outcome) external {
        require(msg.sender == owner);
        markets[marketId].resolved = true;
        markets[marketId].outcome = outcome;
    }

    function withdraw(uint256 marketId) external {
        Market storage m = markets[marketId];
        require(m.resolved);

        uint256 totalPool = m.yesPool + m.noPool;
        uint256 winningPool = m.outcome ? m.yesPool : m.noPool;
        uint256 userBet = userBets[marketId][msg.sender];

        uint256 payout = (userBet * totalPool) / winningPool;
        userBets[marketId][msg.sender] = 0;

        usdc.transfer(msg.sender, payout);
    }
}
Commit new file
