let cached_stats;
let cached_weapon;

function recalcDamage() {
    if(!player_build)
        return;
    
    let specialDamage = document.createElement("p");

    const conversion = [
        document.getElementById('nInput').value,
        document.getElementById('eInput').value,
        document.getElementById('tInput').value,
        document.getElementById('wInput').value,
        document.getElementById('fInput').value,
        document.getElementById('aInput').value,
    ];

    let isMelee = document.getElementById('meleeInput').checked;
    let ignoreStrDex = document.getElementById('strdexInput').checked;

    let _results = calculateSpellDamage(cached_stats, player_build.weapon.statMap, conversion, !isMelee, isMelee, undefined, ignoreStrDex);

    let critChance = skillPointsToPercentage(cached_stats.get("dex"));
    
    let totalDamNormal = _results[0];
    let totalDamCrit = _results[1];
    
    let nonCritAverage = (totalDamNormal[0]+totalDamNormal[1])/2 || 0;
    let critAverage = (totalDamCrit[0]+totalDamCrit[1])/2 || 0;
    let averageDamage = (1-critChance)*nonCritAverage+critChance*critAverage || 0;

    let averageLabel = document.createElement("p");
    averageLabel.innerHTML = "Average: <span class='Damage'>" + averageDamage.toFixed(2) + "</span>";

    let critAverageLabel = document.createElement("p");
    critAverageLabel.innerHTML = "Crit Average: <span class='Damage'>" + critAverage.toFixed(2) + "</span>";

    let nonCritAverageLabel = document.createElement("p");
    nonCritAverageLabel.innerHTML = "Non-Crit Average: <span class='Damage'>" + nonCritAverage.toFixed(2) + "</span>";

    specialDamage.appendChild(averageLabel);
    specialDamage.appendChild(critAverageLabel);
    specialDamage.appendChild(nonCritAverageLabel);

    document.getElementById('custom-infoAvg').innerHTML = '';
    document.getElementById('custom-infoAvg').append(specialDamage);
}

document.querySelectorAll('.damage-input').forEach(el => {
    el.addEventListener('input', recalcDamage);
});