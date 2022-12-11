export const day11 = `
Monkey 0:
  Starting items: 72, 64, 51, 57, 93, 97, 68
  Operation: new = old * 19
  Test: divisible by 17
    If true: throw to monkey 4
    If false: throw to monkey 7

Monkey 1:
  Starting items: 62
  Operation: new = old * 11
  Test: divisible by 3
    If true: throw to monkey 3
    If false: throw to monkey 2

Monkey 2:
  Starting items: 57, 94, 69, 79, 72
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 0
    If false: throw to monkey 4

Monkey 3:
  Starting items: 80, 64, 92, 93, 64, 56
  Operation: new = old + 5
  Test: divisible by 7
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 4:
  Starting items: 70, 88, 95, 99, 78, 72, 65, 94
  Operation: new = old + 7
  Test: divisible by 2
    If true: throw to monkey 7
    If false: throw to monkey 5

Monkey 5:
  Starting items: 57, 95, 81, 61
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 1
    If false: throw to monkey 6

Monkey 6:
  Starting items: 79, 99
  Operation: new = old + 2
  Test: divisible by 11
    If true: throw to monkey 3
    If false: throw to monkey 1

Monkey 7:
  Starting items: 68, 98, 62
  Operation: new = old + 3
  Test: divisible by 13
    If true: throw to monkey 5
    If false: throw to monkey 6
`