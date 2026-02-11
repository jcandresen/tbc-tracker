# TBC Anniversary Shadow Priest Tracker

A lightweight, browser-based progression tracker for Shadow Priests in the World of Warcraft: Burning Crusade Anniversary edition. This tool tracks Pre-Raid BiS, Phase 1 goals, and critical heroic attunement reputations.

## 🚀 Features
* **Wowhead Integration:** Hover over any item or faction to see live tooltips, stats, and drop locations via the Wowhead API.
* **Persistence:** Your progress is saved automatically to your browser's `localStorage`. No login or database required.
* **Mobile Friendly:** Clean, responsive design for tracking progress while playing.
* **Priest Aesthetic:** Custom CSS themed around the Shadow Priest class.

## 🛠️ Tech Stack
* **HTML5 / CSS3**
* **Vanilla JavaScript**
* **Wowhead Tooltip Engine** (External Script)

## 📂 Project Structure
* `index.html`: The core structure and external script links.
* `style.css`: Custom "Shadow" theme and layout.
* `script.js`: Logic for rendering items and saving checkbox states.

## 🔧 Setup & Customization
To host this yourself:
1.  Fork or download this repository.
2.  Upload the files to a GitHub repository.
3.  Enable **GitHub Pages** in the repository settings.

### Adding New Items
To add more items (e.g., Phase 2 gear), open `script.js` and add a new entry to the `gearItems` array:
```javascript
{ id: ITEM_ID, name: "ITEM_NAME" }