import { DefinedUsing } from "bc-minecraft-molang";
import { expect } from "chai";
import { jsonc } from "jsonc";
import { Internal } from "../src/main";

export namespace VanillaPlayer {
  export const Goes: string[] = ["cape", "humanoid.custom"];
  export const Variables: DefinedUsing<string> = {
    defined: [
      "is_holding_right",
      "is_blinking",
      "last_blink_time",
      "hand_bob",
      "helmet_layer_visible",
      "leg_layer_visible",
      "boot_layer_visible",
      "chest_layer_visible",
      "attack_body_rot_y",
      "tcos0",
      "first_person_rotation_factor",
      "hand_bob",
      "map_angle",
      "item_use_normalized",
    ],
    using: ["attack_time", "gliding_speed_value", "hand_bob", "player_x_rotation"],
  };

  export const Data = `{
  "format_version": "1.10.0",
  "minecraft:client_entity": {
    "description": {
      "identifier": "minecraft:player",
      "materials": {
        "default": "entity_alphatest",
        "cape": "entity_alphatest",
        "animated": "player_animated"
      },
      "textures": {
        "default": "textures/entity/steve",
        "cape": "textures/entity/cape_invisible"
      },
      "geometry": {
        "default": "geometry.humanoid.custom",
        "cape": "geometry.cape"
      },
      "scripts": {
        "scale": "0.9375",
        "initialize": [
          "variable.is_holding_right = 0.0;",
          "variable.is_blinking = 0.0;",
          "variable.last_blink_time = 0.0;",
          "variable.hand_bob = 0.0;"
        ],
        "pre_animation": [
          "variable.helmet_layer_visible = 1.0;",
          "variable.leg_layer_visible = 1.0;",
          "variable.boot_layer_visible = 1.0;",
          "variable.chest_layer_visible = 1.0;",
          "variable.attack_body_rot_y = Math.sin(360*Math.sqrt(variable.attack_time)) * 5.0;",
          "variable.tcos0 = (math.cos(query.modified_distance_moved * 38.17) * query.modified_move_speed / variable.gliding_speed_value) * 57.3;",
          "variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);",
          "variable.hand_bob = query.life_time < 0.01 ? 0.0 : variable.hand_bob + ((query.is_on_ground && query.is_alive ? math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1) : 0.0) - variable.hand_bob) * 0.02;",

          "variable.map_angle = math.clamp(1 - variable.player_x_rotation / 45.1, 0.0, 1.0);",
          "variable.item_use_normalized = query.main_hand_item_use_duration / query.main_hand_item_max_duration;"
        ],
        "animate": [
          "root"
        ]
      },
      "animations": {
        "root": "controller.animation.player.root",
        "base_controller": "controller.animation.player.base",
        "hudplayer":  "controller.animation.player.hudplayer",
        "humanoid_base_pose": "animation.humanoid.base_pose",
        "look_at_target": "controller.animation.humanoid.look_at_target",
        "look_at_target_ui": "animation.player.look_at_target.ui",
        "look_at_target_default": "animation.humanoid.look_at_target.default",
        "look_at_target_gliding": "animation.humanoid.look_at_target.gliding",
        "look_at_target_swimming": "animation.humanoid.look_at_target.swimming",
        "look_at_target_inverted": "animation.player.look_at_target.inverted",
        "cape": "animation.player.cape",
        "move.arms": "animation.player.move.arms",
        "move.legs": "animation.player.move.legs",
        "swimming": "animation.player.swim",
        "swimming.legs": "animation.player.swim.legs",
        "riding.arms": "animation.player.riding.arms",
        "riding.legs": "animation.player.riding.legs",
        "holding": "animation.player.holding",
        "brandish_spear": "animation.humanoid.brandish_spear",
        "charging": "animation.humanoid.charging",
        "attack.positions": "animation.player.attack.positions",
        "attack.rotations": "animation.player.attack.rotations",
        "sneaking": "animation.player.sneaking",
        "bob": "animation.player.bob",
        "damage_nearby_mobs": "animation.humanoid.damage_nearby_mobs",
        "fishing_rod": "animation.humanoid.fishing_rod",
        "use_item_progress": "animation.humanoid.use_item_progress",
        "skeleton_attack": "animation.skeleton.attack",
        "sleeping": "animation.player.sleeping",
        "first_person_base_pose": "animation.player.first_person.base_pose",
        "first_person_empty_hand": "animation.player.first_person.empty_hand",
        "first_person_swap_item": "animation.player.first_person.swap_item",
        "first_person_attack_controller": "controller.animation.player.first_person_attack",
        "first_person_attack_rotation": "animation.player.first_person.attack_rotation",
        "first_person_vr_attack_rotation": "animation.player.first_person.vr_attack_rotation",
        "first_person_map_controller": "controller.animation.player.first_person_map",
        "first_person_map_hold": "animation.player.first_person.map_hold",
        "first_person_map_hold_attack": "animation.player.first_person.map_hold_attack",
        "first_person_map_hold_off_hand": "animation.player.first_person.map_hold_off_hand",
        "first_person_map_hold_main_hand": "animation.player.first_person.map_hold_main_hand",
        "first_person_crossbow_equipped": "animation.player.first_person.crossbow_equipped",
        "third_person_crossbow_equipped": "animation.player.crossbow_equipped",
        "third_person_bow_equipped": "animation.player.bow_equipped",
        "crossbow_hold": "animation.player.crossbow_hold",
        "crossbow_controller": "controller.animation.player.crossbow",
        "shield_block_main_hand": "animation.player.shield_block_main_hand",
        "shield_block_off_hand": "animation.player.shield_block_off_hand",
        "blink": "controller.animation.persona.blink"
      },
      "render_controllers": [
        { "controller.render.player.first_person": "variable.is_first_person" },
        { "controller.render.player.third_person": "!variable.is_first_person && !variable.map_face_icon" },
        { "controller.render.player.map": "variable.map_face_icon" }
      ],
      "enable_attachables": true
    }
  }
}`;

  export const DataOBject = jsonc.parse(Data);
}

describe("data test", () => {
  it("object", () => {
    const obj = VanillaPlayer.DataOBject;

    expect(obj).to.not.be.undefined;

    const temp = <Internal.ResourcePack.Entity>obj;

    expect(temp.format_version).to.not.be.undefined;
    expect(temp["minecraft:client_entity"].description).to.not.be.undefined;
    expect(temp["minecraft:client_entity"].description.identifier).to.not.be.undefined;

    expect(Internal.ResourcePack.Entity.is(temp)).to.be.true;
  });
});
