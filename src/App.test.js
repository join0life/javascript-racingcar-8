import { Console } from "@woowacourse/mission-utils";
import App from "./App.js";

describe("우승자 구하기 테스트", () => {
  test("carPositions 최대인 자동차 이름 배열", () => {
    const carNames = ["pobi", "woni", "jun"];
    const carPositions = [5, 5, 5];

    jest.spyOn(Console, "print").mockImplementation(() => {});

    const app = new App();
    app.printWinners(carNames, carPositions);

    expect(Console.print).toHaveBeenCalledWith("최종 우승자 : pobi, woni, jun");

    Console.print.mockRestore();
  });
});
