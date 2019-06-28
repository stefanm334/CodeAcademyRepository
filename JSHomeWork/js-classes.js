/* An orc warrior is fighting a human footman. The battle ends when one of
them dies. The orc has 720 hitpoints, does 23-35 damage and has 5
armor. The human footman has 550 hitpoints, does 18-27 damage, but
has a shield that gives him 9 armor. Shields and armor deduct the
damage that the fighter takes. Who will win the fight? */


function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}



function Fighter(name,hp, armor, mindmg, maxdmg) {
    this.name = name;
    this.hp = hp;
    this.armor = armor;
    this.dmg = getRandomNumber(mindmg, maxdmg)
}




function fight() {
    var a = new Fighter("orcWarrior",720, 5, 23, 35);
    var b = new Fighter("humanFootman",550, 9, 18, 27)
    for (let attacks = 0; a.hp > 0 || b.hp > 0; attacks++) {
        a.hp -= (b.dmg - a.armor);
        b.hp -= (a.dmg - b.armor);
    }
    if (a.hp === 0) {
        console.log(a.name + ' Victory')
    }
    else {
        console.log(b.name + ' Victory')
    }
}



fight();