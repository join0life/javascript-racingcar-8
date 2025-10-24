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
  }
}

export default App;
