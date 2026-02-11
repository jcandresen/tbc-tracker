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

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = storageKey;
        if (isChecked) input.checked = true;

        const label = document.createElement('label');
        label.htmlFor = storageKey;
        label.className = 'item-label';

        const link = document.createElement('a');
        link.href = `https://www.wowhead.com/tbc/${type}=${item.id}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = item.name;

        label.appendChild(link);

        // Save progress and toggle visual state
        input.addEventListener('change', (e) => {
            localStorage.setItem(storageKey, e.target.checked);
            if (e.target.checked) div.classList.add('checked'); else div.classList.remove('checked');
        });

        if (isChecked) div.classList.add('checked');

        div.appendChild(input);
        div.appendChild(label);
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderList('pre-raid-list-inner', preRaidItems, 'item');
    renderList('p1-list-inner', p1BisItems, 'item');
    renderList('rep-list-inner', reputations, 'faction');
});