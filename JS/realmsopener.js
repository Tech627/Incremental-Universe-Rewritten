const realms = document.querySelectorAll(".realm");
const realm_all_content = document.querySelectorAll(".realm-content")

realms.forEach((realm, index)=>{
    realm.addEventListener("click", () => {
        realms.forEach(realm=>{realm.classList.remove("active")})
        realm.classList.add("active")

        realm_all_content.forEach(realm_content=>{realm_content.classList.remove("active")})
        realm_all_content[index].classList.add("active")
    })
})

function EnterMatterRealm() {
    if(player.MatterRealmOpened === false) {
        player.MatterRealmOpened = true
    }
}

function ExitRealm() {
    realm_all_content.forEach(realm_content=>{realm_content.classList.remove("active")})
    if(player.MatterRealmOpened === true) {
        player.MatterRealmOpened = false
    }
}