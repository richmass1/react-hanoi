import { useState } from 'react';

function Rectangle({text, isSelected, onClick}) {
  let colorString = 'rgb(256, 256, 256)';
  if (isSelected) {
    colorString = 'rgb(200, 200, 200)';
  }
  return (<button className="rect" style={{background: colorString}} onClick={onClick}>{text}</button>);
}

export default function App() {
  const DISKS = 5;
  const COLUMNS = 3;
  let initBoard = [];
  for (let i = 1; i <= DISKS; i++) {
    let disk = "";
    for (let j = 0; j < i; j++) {
      disk = disk.concat('-');
    }
    initBoard.push(disk);
    for (let j = 0; j < COLUMNS - 1; j++) {
      initBoard.push(null);
    }
  }

  const [alltext, setAlltext] = useState(initBoard);
  const [selected, setSelected] = useState(null);

  function transfer(index1, index2) {
    if (index1 == index2) {
      return;
    }

    let i;
    let curDisk = null;
    for(i = index1 - 1; i < (COLUMNS*DISKS); i += COLUMNS) {
      curDisk = alltext[i];
      if(curDisk) {
        break;
      }
    }
    if(!curDisk) {
      return;
    }
    let newText = alltext.slice();
    let diskBelow = null;
    let i2;
    for(i2 = index2 - 1; i2 < (COLUMNS*DISKS); i2 += COLUMNS) {
      diskBelow = alltext[i2];
      if(diskBelow) {
        break;
      }
    }
    if(!diskBelow || diskBelow.length > curDisk.length) {
      newText[i] = null;
      newText[i2 - COLUMNS] = curDisk;
    }
    setAlltext(newText);
  }

  function gotClicked(index) {
    if (!selected) {
      setSelected(index);
    } else {
      transfer(selected, index);
      setSelected(0);
    }
  }

  let rows = [];
  for (let rowIndex = 0; rowIndex < DISKS; rowIndex++) {
    rows.push((<div className='row'>
    <Rectangle text={alltext[3*rowIndex]} isSelected={selected == 1} onClick={() => gotClicked(1)}/>
    <Rectangle text={alltext[3*rowIndex+1]} isSelected={selected == 2} onClick={() => gotClicked(2)}/>
    <Rectangle text={alltext[3*rowIndex+2]} isSelected={selected == 3} onClick={() => gotClicked(3)}/>
  </div>));
  }

  return (<>{rows}</>);
}