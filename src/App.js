import { Console, MissionUtils } from "@woowacourse/mission-utils";

class App {
  async run() {
    const getInput = async () => {
      const carNamesInput = await Console.readLineAsync(
        "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
      );
      const carNames = carNamesInput.split(",").map((name) => name.trim());

      const moveCountInput = await Console.readLineAsync(
        "시도할 횟수는 몇 회인가요?"
      );
      const moveCount = Number(moveCountInput);
      return { carNames, moveCount };
    };

    const validateInput = (carNames) => {
      if (carNames.some((name) => name.length > 5)) {
        throw new Error("[ERROR] 자동차 이름은 5자 이하이어야 합니다.");
      }

      if (carNames.length < 1) {
        throw new Error("[ERROR] 자동차 이름은 최소 1개 이상이어야 합니다.");
      }
    };

    const playGame = (carNames, moveCount) => {
      const carPositions = Array.from({ length: carNames.length }, () => 0);
      for (let i = 0; i < moveCount; i++) {
        moveCountCars(carNames, carPositions);
        printRoundResult(carNames, carPositions);
      }

      return carPositions;
    };

    const moveCountCars = (carNames, carPositions) => {
      for (let i = 0; i < carNames.length; i++) {
        const randomNumbers = Array.from({ length: carNames.length }, () =>
          MissionUtils.Random.pickNumberInRange(0, 9)
        );
        if (randomNumbers[i] >= 4) carPositions[i]++;
      }
    };

    const printRoundResult = (carNames, carPositions) => {
      carNames.forEach((_, i) => {
        Console.print(`${carNames[i]} : ${"-".repeat(carPositions[i])}`);
      });
      Console.print("");
    };

    //1. 자동차 입력
    const { carNames, moveCount } = await getInput();

    //2. 검증
    validateInput(carNames);

    //3. 게임 실행
    Console.print("실행 결과");
    const carPositions = playGame(carNames, moveCount);

    // 4. 우승자 출력
    this.printWinners(carNames, carPositions);
  }

  printWinners(carNames, carPositions) {
    const maxPositions = Math.max(...carPositions);

    const winners = carNames.filter((_, i) => carPositions[i] === maxPositions);
    Console.print(`최종 우승자 : ${winners.join(", ")}`);
  }
}

export default App;
