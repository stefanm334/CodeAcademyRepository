/* An orc warrior is fighting a human footman. The battle ends when one of
them dies. The orc has 720 hitpoints, does 23-35 damage and has 5
armor. The human footman has 550 hitpoints, does 18-27 damage, but
has a shield that gives him 9 armor. Shields and armor deduct the
damage that the fighter takes. Who will win the fight? */


function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}


function orcWarrriorVShumanFootman() {
    var orcWarriorHP = 720;
    var orcWarriorArmor = 5;
    var orcWarriorDmg = getRandomNumber(23, 35)
    var humanFootmanHP = 550;
    var humanFootmanArmor = 9;
    var humanFootmanDmg = getRandomNumber(18, 27)
    for (let attacks = 0; orcWarriorHP > 0 || humanFootmanHP > 0; attacks++) {
        orcWarriorHP -= (humanFootmanDmg - orcWarriorArmor);
        humanFootmanHP -= (orcWarriorDmg - humanFootmanArmor);
    }
    if (orcWarriorHP === 0){
        console.log("Human Footman Victory")
    }
    else{
        console.log("Orc Warrior Victory")
    }
}

orcWarrriorVShumanFootman();