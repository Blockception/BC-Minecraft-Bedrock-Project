import { expect } from "chai";
import { Text } from '../../src/Lib/Types/Text';

describe("Text", () => {
  it("UnQuote1", ()=>expect(Text.UnQuote('"example"')).to.equal("example"));
  it("UnQuote2", ()=>expect(Text.UnQuote('example')).to.equal("example"));
  it("UnQuote3", ()=>expect(Text.UnQuote('"I am too complex"')).to.equal('"I am too complex"'));
});
