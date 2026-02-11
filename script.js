const gearItems = [
    { id: 24266, name: "Spellstrike Hood" },
    { id: 24264, name: "Spellstrike Pants" },
    { id: 21871, name: "Frozen Shadoweave Robe" },
    { id: 21869, name: "Frozen Shadoweave Shoulders" },
    { id: 21870, name: "Frozen Shadoweave Boots" },
    { id: 29370, name: "Icon of the Silver Crescent" }
];

const reputations = [
    { id: 935, name: "The Sha'tar (Revered)" },
    { id: 1011, name: "Lower City (Revered)" },
    { id: 942, name: "Cenarion Expedition (Exalted)" }
];

function renderList(listId, data, type) {
    const container = document.getElementById(listId);
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'checklist-item';
        
        const storageKey = `${type}-${item.id}`;
        const checked = localStorage.getItem(storageKey) === 'true' ? 'checked' : '';

        div.innerHTML = `
            <input type="checkbox" id="${storageKey}" ${checked} onchange="saveProgress('${storageKey}', this.checked)">
            <a href="https://www.wowhead.com/tbc/${type}=${item.id}">${item.name}</a>
        `;
        container.appendChild(div);
    });
}

function saveProgress(key, isChecked) {
    localStorage.setItem(key, isChecked);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderList('gear-list', gearItems, 'item');
    renderList('rep-list', reputations, 'faction');
});