function GameLoop() {
    var MatterGenPower = new Decimal(0)
    MatterGenPower = MatterGenPower.add(player.Matter_gen.amt)
    var GeneratorBoostPower = player.Matter_boost.eff
    var BoosterRaiserPower = player.Matter_raiser.eff
    player.Matter = player.Matter.add(player.MatterPerSec.div(33))
    var mm6Eff = player.Matter.log10().add(1)
    Matter_Milestones.mm6.eff = mm6Eff
    var UCgain = player.Matter.log10().div(1000)
    player.CMgain = UCgain
    var UCeff = player.CollapsedMatter.sqrt().div(2.5).add(1)
    player.CMeff = UCeff
    if(Matter_Milestones.amt.gte(1)) {
        Matter_Milestones.req = new Decimal(200)
        Matter_Milestones.mm2.unl = true 
        MatterGenPower = MatterGenPower.mul(Matter_Milestones.mm1.eff)
    }
    if (Matter_Milestones.amt.gte(2)) {
        Matter_Milestones.req = new Decimal(1e3)
        Matter_Milestones.mm3.unl = true 
        player.Matter_boost.unl = true
    }
    if (Matter_Milestones.amt.gte(4)) {
        Matter_Milestones.req = new Decimal(1e5)
        Matter_Milestones.mm5.unl = true
        player.Matter_raiser.unl = true 
    }
    if (Matter_Milestones.amt.gte(5)) {
        Matter_Milestones.req = new Decimal(1e7)
        Matter_Milestones.mm6.unl = true 
        GeneratorBoostPower = GeneratorBoostPower.mul(Matter_Milestones.mm5.eff)
    }
    GeneratorBoostPower = GeneratorBoostPower.pow(BoosterRaiserPower)
    MatterGenPower = MatterGenPower.mul(GeneratorBoostPower)
    player.MatterPerSec = MatterGenPower
    if (Matter_Milestones.amt.gte(3)) {
        Matter_Milestones.req = new Decimal(5e3)
        Matter_Milestones.mm4.unl = true 
        player.MatterPerSec = player.MatterPerSec.mul(Matter_Milestones.mm3.eff)
    }
    if (Matter_Milestones.amt.gte(6)) {
        Matter_Milestones.req = new Decimal(1e8)
        player.MatterPerSec = player.MatterPerSec.mul(Matter_Milestones.mm6.eff)
        Matter_Milestones.mm7.unl = true
    }
    if (Matter_Milestones.amt.gte(7)) {
        player.CMunl = true
    }
    document.getElementById("gen-description").textContent = "Gives +" + format(MatterGenPower, precision = 1) + " Matter/sec"
    document.getElementById("boost-description").textContent = "Gives " + format(GeneratorBoostPower, precision = 2) + "x mult to Matter Generators"
    document.getElementById("raiser-description").textContent = "Gives ^" + format(BoosterRaiserPower, precision = 2) + " to Generator Boosters"
    UpdateGUI()
}

function UpdateGUI() {
    if(player.MatterRealmOpened === true) {
        document.getElementById("Matter-realm").style.display = "none"
    }
    else {
        document.getElementById("Matter-realm").style.display = "block"
    }
    if(player.Matter_boost.unl === false) {
        document.getElementById("Matter-boost").style.display = "none"
    }
    else {
        document.getElementById("Matter-boost").style.display = "block"
    }
    if(player.Matter_raiser.unl === false) {
        document.getElementById("Matter-raiser").style.display = "none"
    }
    else {
        document.getElementById("Matter-raiser").style.display = "block"
    }
    if(Matter_Milestones.mm2.unl === false) {
        document.getElementById("mm2").style.display = "none"
    }
    else {
        document.getElementById("mm2").style.display = "block"
    }
    if(Matter_Milestones.mm3.unl === false) {
        document.getElementById("mm3").style.display = "none"
    }
    else {
        document.getElementById("mm3").style.display = "block"
    }
    if(Matter_Milestones.mm4.unl === false) {
        document.getElementById("mm4").style.display = "none"
    }
    else {
        document.getElementById("mm4").style.display = "block"
    }
    if(Matter_Milestones.mm5.unl === false) {
        document.getElementById("mm5").style.display = "none"
    }
    else {
        document.getElementById("mm5").style.display = "block"
    }
    if(Matter_Milestones.mm6.unl === false) {
        document.getElementById("mm6").style.display = "none"
    }
    else {
        document.getElementById("mm6").style.display = "block"
    }
    if(Matter_Milestones.mm7.unl === false) {
        document.getElementById("mm7").style.display = "none"
    }
    else {
        document.getElementById("mm7").style.display = "block"
    }
    if(player.CMunl === false) {
        document.getElementById("Section-3").style.display = "none"
        document.getElementById("Section3-content").style.display = "none"
    }
    else {
        document.getElementById("Section-3").style.display = "flex"
        document.getElementById("Section3-content").style.display = "block"
    }
    document.getElementById("Matter-num").textContent = format(player.Matter)
    document.getElementById("Matter-persec").textContent = "(+" + format(player.MatterPerSec) + " Matter/sec)"
    document.getElementById("gen-name").textContent = "Matter Generator [" + format(player.Matter_gen.amt, precision = 0) + "]"
    document.getElementById("gen-cost").textContent = "Cost: " + format(player.Matter_gen.cost, precision = 2) + " Matter"
    document.getElementById("boost-name").textContent = "Generator Booster [" + format(player.Matter_boost.amt, precision = 0) + "]"
    document.getElementById("boost-cost").textContent = "Cost: " + format(player.Matter_boost.cost, precision = 2) + " Matter"
    document.getElementById("raiser-name").textContent = "Booster Raiser [" + format(player.Matter_raiser.amt, precision = 0) + "]"
    document.getElementById("raiser-cost").textContent = "Cost: " + format(player.Matter_raiser.cost, precision = 2) + " Matter"
    document.getElementById("Collapsed-txt").textContent = format(player.CollapsedMatter, precision = 2)
    document.getElementById("UCr-gain").textContent = "+" + format(player.CMgain, precision = 2) + " Collapsed Matter on reset"
    document.getElementById("CM-eff").textContent = format(player.CMeff, precision = 2) + "x"
    document.getElementById("mmr-req").textContent = "Req: " + format(Matter_Milestones.req, precision = 0) + " Matter"
    if(Matter_Milestones.amt.gte(8)) {
        document.getElementById("mmr-req").textContent = "Req: infinity"
    }
}

setInterval(GameLoop, 33)