let player = {
    Matter: new Decimal(10),
    MatterPerSec: new Decimal(0),
    Matter_gen: {
        amt: new Decimal(0),
        gain: new Decimal(0),
        cost: new Decimal(10)
    },
    Matter_boost: {
        amt: new Decimal(0),
        eff: new Decimal(1),
        cost: new Decimal(100),
        unl: false,
    },
    Matter_raiser: {
        amt: new Decimal(0),
        eff: new Decimal(1),
        cost: new Decimal(1e3),
        unl: false,
    },
    CollapsedMatter: new Decimal(0),
    CMeff: new Decimal(1),
    CMgain: new Decimal(0),
    CMunl: false,
    MatterRealmOpened: false,
}

let Matter_Milestones = {
    mm1: {
        eff: new Decimal(1.5),
    },
    mm2: {
        unl: false,
    },
    mm3: {
        unl: false,
        eff: new Decimal(1.1),
    },
    mm4: {
        unl: false,
    },
    mm5: {
        unl: false,
        eff: new Decimal(1.05),
    },
    mm6: {
        unl: false,
        eff: new Decimal(1),
    },
    mm7: {
        unl: false,
    },
    req: new Decimal(50),
    amt: new Decimal(0),
}

function BuyMatterGen() {
    if(player.Matter.gte(player.Matter_gen.cost)) {
        player.Matter = player.Matter.sub(player.Matter_gen.cost)
        player.Matter_gen.gain = player.Matter_gen.gain.add(1)
        player.Matter_gen.amt = player.Matter_gen.amt.add(1)
        player.Matter_gen.cost = player.Matter_gen.cost.mul(1.5)
    }
}

function BuyMatterBoost() {
    if(player.Matter.gte(player.Matter_boost.cost)) {
        player.Matter = player.Matter.sub(player.Matter_boost.cost)
        player.Matter_boost.cost = player.Matter_boost.cost.mul(3.5)
        player.Matter_boost.amt = player.Matter_boost.amt.add(1)
        player.Matter_boost.eff = player.Matter_boost.eff.add(1)
    }
}

function BuyMatterRaiser() {
    if(player.Matter.gte(player.Matter_raiser.cost)) {
        player.Matter = player.Matter.sub(player.Matter_raiser.cost)
        player.Matter_raiser.cost = player.Matter_raiser.cost.mul(15)
        player.Matter_raiser.amt = player.Matter_raiser.amt.add(1)
        player.Matter_raiser.eff = player.Matter_raiser.eff.add(1)
    }
}

function BuyMatterMilestone() {
    if(player.Matter.gte(Matter_Milestones.req) && Matter_Milestones.amt.lt(8)) {
        player.Matter = player.Matter.sub(player.Matter)
        Matter_Milestones.amt = Matter_Milestones.amt.add(1)
    }
}

function GetCollapsedMatter() {
    if(player.CMgain.gte(1)) {
        player.Matter = player.Matter.sub(player.Matter)
        player.MatterPerSec = player.MatterPerSec.sub(player.MatterPerSec)
        player.Matter_gen.amt = new Decimal(0)
        player.Matter_boost.amt = new Decimal(0)
        player.Matter_raiser.amt = new Decimal(0)
        player.Matter_gen.cost = new Decimal(10)
        player.Matter_boost.cost = new Decimal(100)
        player.Matter_raiser = new Decimal(1e3)
        player.Matter_gen.gain = new Decimal(0)
        player.Matter_boost.eff = new Decimal(1)
        player.Matter_raiser.eff = new Decimal(1)
    }
}