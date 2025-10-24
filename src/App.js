import { Console, MissionUtils, Random } from "@woowacourse/mission-utils";

class App {
  async run() {
    //1. 자동차 입력(단, 5자 이하만)
    let carNamesInput = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );

    const carNames = carNamesInput.split(",").map((name) => name.trim()); // [pobi, poro, crong]

    if (carNames.some((name) => name.length > 5)) {
      throw new Error("[ERROR] 자동차 이름은 5자 이하이어야 합니다.");
    }

    if (carNames.length < 1) {
      throw new Error("[ERROR] 자동차 이름은 최소 1개 이상이어야 합니다.");
    }

    // 2. 시도 횟수 입력
    const moveCountInput = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?"
    );
    const moveCount = Number(moveCountInput);

    // 3. 자동차 전진
    Console.print("실행 결과");

    const carPositions = Array.from({ length: carNames.length }, () => 0);

    for (let i = 0; i < moveCount; i++) {
      const randomNumbers = Array.from({ length: carNames.length }, () =>
        MissionUtils.Random.pickNumberInRange(0, 9)
      );

      for (let j = 0; j < carNames.length; j++) {
        if (randomNumbers[j] >= 4) carPositions[j]++;
        Console.print(`${carNames[j]} :` + "-".repeat(carPositions[j]));
      }

      Console.print("");
    }
    // 4. 우승자 출력(단, 우승자는 1명 이상일 수 있음)
    // 5. 잘못된 값 입력시 “[ERROR]” 로 시작하는 메시지와 함께 Error 발생 후 애플리케이션 종료
    // 6. 함수 단위로 구현하여 리팩토링
  }
}

export default App;
