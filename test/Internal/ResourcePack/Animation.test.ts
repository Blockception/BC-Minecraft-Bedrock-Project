import { expect } from "chai";
import { Json } from "../../../src/Lib/Internal/Json";
import { Internal } from "../../../src/main";


describe("RP Animation", () => {
  it("is", () => {
    const correct_animations : string[]= [
      "{}",
      `{
        "loop": true,
        "bones": {
          "body": {
            "rotation": [ "25 * math.sin(variable.attack_time * 30)", 0, 0 ]
          }
        }
      }`
    ]
    correct_animations.forEach((anim, index)=>{
      it("correct " + index,()=>{
        const obj = Json.To<Internal.ResourcePack.Animation>(anim);

        expect(obj).to.not.be.undefined;
    
        if (!obj) return;
        expect(Internal.ResourcePack.Animation.is(obj)).to.be.true;

      })
    })

  });
});