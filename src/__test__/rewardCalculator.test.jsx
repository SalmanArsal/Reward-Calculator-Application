import {
  calculateRewardPoints,
  calculateMonthlyRewards,
  calculateTotalRewards,
} from '../utils/calculateRewardPoints';

describe('Reward Points Calculator', () => {
  describe('calculateRewardPoints', () => {
    // Positive test cases
    test('should calculate 0 points for amount below $50', () => {
      expect(calculateRewardPoints(30)).toBe(0);
      expect(calculateRewardPoints(45.99)).toBe(0);
      expect(calculateRewardPoints(0)).toBe(0);
    });

    test('should calculate 1 point per dollar between $50-$100', () => {
      expect(calculateRewardPoints(50)).toBe(0); 
      expect(calculateRewardPoints(60)).toBe(10);
      expect(calculateRewardPoints(75)).toBe(25); 
      expect(calculateRewardPoints(100)).toBe(50); 
    });

    test('should calculate 2 points for dollars above $100 + 1 point for $50-$100', () => {
      expect(calculateRewardPoints(120)).toBe(90); 
      expect(calculateRewardPoints(150)).toBe(150); 
      expect(calculateRewardPoints(200)).toBe(250); 
    });

    // Decimal test cases
    test('should handle decimal amounts correctly', () => {
      expect(calculateRewardPoints(75.50)).toBe(25);
      expect(calculateRewardPoints(120.99)).toBe(90);
    });

    // Edge cases
    test('should handle invalid inputs', () => {
      expect(calculateRewardPoints(null)).toBe(0);
      expect(calculateRewardPoints(undefined)).toBe(0);
      expect(calculateRewardPoints('invalid')).toBe(0);
      expect(calculateRewardPoints(NaN)).toBe(0);
    });

    test('should handle negative amounts', () => {
      expect(calculateRewardPoints(-50)).toBe(0);
      expect(calculateRewardPoints(-100)).toBe(0);
    });

    test('should handle string numbers', () => {
      expect(calculateRewardPoints('75')).toBe(25);
      expect(calculateRewardPoints('120')).toBe(90);
    });
  });

  describe('calculateMonthlyRewards', () => {
    const mockTransactions = [
      { date: '2025-03-15', amount: 120, customerId: 'C1' },
      { date: '2025-03-18', amount: 85, customerId: 'C1' },
      { date: '2025-02-10', amount: 200, customerId: 'C1' },
      { date: '2025-01-20', amount: 50, customerId: 'C1' },
    ];

    test('should calculate monthly rewards correctly', () => {
      expect(calculateMonthlyRewards(mockTransactions, 3, 2025)).toBe(
        calculateRewardPoints(120) + calculateRewardPoints(85)
      );
      expect(calculateMonthlyRewards(mockTransactions, 2, 2025)).toBe(
        calculateRewardPoints(200)
      );
    });

    test('should return 0 for months with no transactions', () => {
      expect(calculateMonthlyRewards(mockTransactions, 12, 2025)).toBe(0);
    });

    test('should handle empty array', () => {
      expect(calculateMonthlyRewards([], 3, 2025)).toBe(0);
    });

    test('should handle invalid input', () => {
      expect(calculateMonthlyRewards(null, 3, 2025)).toBe(0);
      expect(calculateMonthlyRewards(undefined, 3, 2025)).toBe(0);
    });
  });

  describe('calculateTotalRewards', () => {
    const mockTransactions = [
      { amount: 120 },
      { amount: 85 },
      { amount: 200 },
      { amount: 50 },
    ];

    test('should calculate total rewards from all transactions', () => {
      const expected =
        calculateRewardPoints(120) +
        calculateRewardPoints(85) +
        calculateRewardPoints(200) +
        calculateRewardPoints(50);
      expect(calculateTotalRewards(mockTransactions)).toBe(expected);
    });

    test('should handle empty array', () => {
      expect(calculateTotalRewards([])).toBe(0);
    });

    test('should handle invalid input', () => {
      expect(calculateTotalRewards(null)).toBe(0);
      expect(calculateTotalRewards(undefined)).toBe(0);
    });

    test('should handle single transaction', () => {
      expect(calculateTotalRewards([{ amount: 120 }])).toBe(
        calculateRewardPoints(120)
      );
    });
  });

  // Integration tests
  describe('Integration Tests', () => {
    test('should handle complex reward calculation scenario', () => {
      const transactions = [
        { date: '2025-03-15', amount: 120, customerId: 'C101' },
        { date: '2025-03-18', amount: 85, customerId: 'C101' },
        { date: '2025-02-10', amount: 200, customerId: 'C101' },
      ];

      const totalPoints = calculateTotalRewards(transactions);
      const marchPoints = calculateMonthlyRewards(transactions, 3, 2025);

      expect(totalPoints).toBeGreaterThan(marchPoints);
      expect(totalPoints).toBe(marchPoints + calculateRewardPoints(200));
    });

    test('should maintain consistency across calculations', () => {
      const amount = 125;
      const transactions = [{ amount }];

      const direct = calculateRewardPoints(amount);
      const viaTotal = calculateTotalRewards(transactions);

      expect(direct).toBe(viaTotal);
    });
  });
});
