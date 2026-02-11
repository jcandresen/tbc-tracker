const preRaidItems = [
    { id: 24266, name: "Spellstrike Hood" },
    { id: 24264, name: "Spellstrike Pants" },
    { id: 21871, name: "Frozen Shadoweave Robe" },
    { id: 21869, name: "Frozen Shadoweave Shoulders" },
    { id: 21870, name: "Frozen Shadoweave Boots" },
    { id: 29370, name: "Icon of the Silver Crescent" }
];

const p1BisItems = [
    { id: 28573, name: "Nathrezim Mindblade" },
    { id: 28753, name: "Orb of the Soul-Eater" },
    { id: 28765, name: "Soul-Presenter" },
    { id: 28507, name: "Ritualistic Eyepatch" },
    { id: 28793, name: "Mindfury Raiment" }
];

const reputations = [
    { id: 935, name: "The Sha'tar (Revered)" },
    { id: 1011, name: "Lower City (Revered)" },
    { id: 942, name: "Cenarion Expedition (Exalted)" },
    { id: 932, name: "The Violet Eye (Exalted)" }
];

function renderList(listId, data, type) {
    const container = document.getElementById(listId);
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'checklist-item';
        
        const storageKey = `${type}-${item.id}`;
        const isChecked = localStorage.getItem(storageKey) === 'true';

        div.innerHTML = `
            <input type="checkbox" id="${storageKey}" ${isChecked ? 'checked' : ''}>
            <a href="https://www.wowhead.com/tbc/${type}=${item.id}">${item.name}</a>
        `;

        // Add event listener to save progress
        div.querySelector('input').addEventListener('change', (e) => {
            localStorage.setItem(storageKey, e.target.checked);
        });

        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderList('pre-raid-list', preRaidItems, 'item');
    renderList('p1-list', p1BisItems, 'item');
    renderList('rep-list', reputations, 'faction');
});