import { useState } from 'react';

// produce a rectangle with specified text and onClick function
function Rectangle({text, isSelected, onClick}) {
  let colorString = 'rgb(256, 256, 256)';

  // if the rectangle has been selected make it gray instead of white
  if (isSelected) {
    colorString = 'rgb(200, 200, 200)';
  }
  return (<button className="rect" style={{background: colorString}} onClick={onClick}>{text}</button>);
}

export default function App() {

  // the number of disks in play, can be arbitrarily high
  // this is also the number of rows
  const DISKS = 5;

  // the number of columns
  // changing this would break the program probably
  const COLUMNS = 3;

  // create a starting board
  let initBoard = [];

  // each iteration of this loop makes one row of the board
  for (let i = 1; i <= DISKS; i++) {
    let disk = "";

    // make an appropriately sized disk in the leftmost column
    for (let j = 0; j < i; j++) {
      disk = disk.concat('-');
    }
    initBoard.push(disk);

    // add empty boxes for the remaining columns
    for (let j = 0; j < COLUMNS - 1; j++) {
      initBoard.push(null);
    }
  }

  // get some useState functions to modify our board and the index of the selected (i.e. clicked) column
  const [alltext, setAlltext] = useState(initBoard);
  const [selected, setSelected] = useState(null);

  // transfer disk from column index1 to column index2
  function transfer(index1, index2) {

    // if you click the same column twice, nothing happens
    if (index1 == index2) {
      return;
    }

    // travel down the first selected column until a disk (nonempty string) is reached
    let i;
    let curDisk = null;
    for(i = index1 - 1; i < (COLUMNS*DISKS); i += COLUMNS) {
      curDisk = alltext[i];
      if(curDisk) {
        break;
      }
    }
    // if column index1 is empty, do nothing
    if(!curDisk) {
      return;
    }

    // copy current board into new array
    let newText = alltext.slice();

    // search for top disk of second selected column
    let diskBelow = null;
    let i2;
    for(i2 = index2 - 1; i2 < (COLUMNS*DISKS); i2 += COLUMNS) {
      diskBelow = alltext[i2];
      if(diskBelow) {
        break;
      }
    }

    // delete the top disk of column index1 and add it above the top disk of column index2
    if(!diskBelow || diskBelow.length > curDisk.length) {
      newText[i] = null;
      newText[i2 - COLUMNS] = curDisk;
    }

    // display the new board state
    setAlltext(newText);
  }

  // handle column clicks
  function gotClicked(index) {
    if (!selected) {
      setSelected(index);
    } else {
      transfer(selected, index);
      setSelected(0);
    }
  }

  // convert alltext into rows of Rectangles with functionality
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