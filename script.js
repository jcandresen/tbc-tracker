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
    // wire up export/import UI
    const btnExport = document.getElementById('btn-export');
    const btnImport = document.getElementById('btn-import');
    const importModal = document.getElementById('import-modal');
    const importText = document.getElementById('import-text');
    const doImport = document.getElementById('do-import');
    const closeImport = document.getElementById('close-import');
    const copyExport = document.getElementById('copy-export');

    function buildExportObject() {
        const out = {};
        const addFrom = (arr, type) => arr.forEach(i => {
            const key = `${type}-${i.id}`;
            out[key] = localStorage.getItem(key) === 'true';
        });
        addFrom(preRaidItems, 'item');
        addFrom(p1BisItems, 'item');
        addFrom(reputations, 'faction');
        return out;
    }

    function exportJSON() {
        return JSON.stringify(buildExportObject(), null, 2);
    }

    function importFromObject(obj) {
        if (typeof obj !== 'object' || obj === null) return;
        Object.keys(obj).forEach(k => {
            const val = !!obj[k];
            localStorage.setItem(k, val);
            const cb = document.getElementById(k);
            if (cb && cb.type === 'checkbox') {
                cb.checked = val;
                const parent = cb.closest('.checklist-item');
                if (parent) parent.classList.toggle('checked', val);
            }
        });
    }

    btnExport && btnExport.addEventListener('click', async () => {
        const txt = exportJSON();
        try {
            await navigator.clipboard.writeText(txt);
            btnExport.textContent = 'Copied!';
            setTimeout(() => btnExport.textContent = 'Export checklist', 1500);
        } catch (e) {
            // fallback: show modal with text for manual copy
            importText.value = txt;
            importModal.setAttribute('aria-hidden', 'false');
            importModal.style.display = 'block';
        }
    });

    btnImport && btnImport.addEventListener('click', () => {
        importText.value = '';
        importModal.setAttribute('aria-hidden', 'false');
        importModal.style.display = 'block';
    });

    closeImport && closeImport.addEventListener('click', () => {
        importModal.setAttribute('aria-hidden', 'true');
        importModal.style.display = 'none';
    });

    doImport && doImport.addEventListener('click', () => {
        const txt = importText.value.trim();
        if (!txt) return;
        try {
            const obj = JSON.parse(txt);
            importFromObject(obj);
            closeImport.click();
        } catch (err) {
            alert('Invalid JSON. Make sure you pasted the export JSON exactly.');
        }
    });

    copyExport && copyExport.addEventListener('click', async () => {
        const txt = exportJSON();
        try {
            await navigator.clipboard.writeText(txt);
            copyExport.textContent = 'Copied';
            setTimeout(() => copyExport.textContent = 'Copy current export', 1200);
        } catch (e) {
            importText.value = txt;
        }
    });
});