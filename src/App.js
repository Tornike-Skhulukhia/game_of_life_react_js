import React, {Component} from 'react';

import Node from './node'
import BottomButtons from './BottomButtons'
import TopButtons from './TopButtons'

import './grid.css';


// function App() {
class App extends Component{
  state = {
    nodesNum: 1500,
    activeIndexes: [],  // active node indexes
    // activeIndexes: [379, 427, 429, 467, 468, 475, 476, 489, 490, 516, 520, 525, 526, 539, 540, 555, 556, 565, 571, 575, 576, 605, 606, 615, 619, 621, 622, 627, 629, 665, 671, 679, 716, 720, 767, 768],
    // activeIndexes: [932, 1030, 1032, 1120, 1121, 1128, 1129, 1142, 1143, 1219, 1223, 1228, 1229, 1242, 1243, 1308, 1309, 1318, 1324, 1328, 1329, 1408, 1409, 1418, 1422, 1424, 1425, 1430, 1432, 1518, 1524, 1532, 1619, 1623, 1720, 1721],
    color: 'red',
    _colors: ['red', 'green', 'blue', 'magenta', 'yellow', 'maroon', 'teal', 'navy', 'fuchsia', 'gray', 'aqua', 'olive'],
    movesNum: 0,
    playing:false, // may be setInterval ID
    movesPerSecond: 2,  // speed
    screenModeIndex: 0,  // overall size & number of nodes
    screenModes:['first', 'second', 'third', 'fourth'],
    nodesNumInRow: 50,
    theme: 'light',
  }

  nodes = () =>{
    let nodes = []
  
    for (let i = 0; i < this.state.nodesNum; i++){
      let nodeClass = (this.state.activeIndexes.indexOf(i) !== -1) ? `cell ${this.state.color}-cell` : "cell" 

      nodes.push(<Node className={nodeClass} deactivateCell={this.deactivateCell} activateCell={this.activateCell} key={i} id={i}/>)
    }
    return nodes
  }

  
  changeColor = () => {
    let newColor = this.state._colors[
                        (this.state._colors.indexOf(this.state.color) + 1) % this.state._colors.length]

    this.setState({color: newColor})
  }

  clearGrid = () =>{
    this.setState({activeIndexes: []})
    this.resetMovesNum()
    this.stopUpdating()
  }

  generateRandom = () => {
    let indexes = []

    if (Math.random() <= 0.9 && this.state.nodesNumInRow !== 24) {
      const temp = Math.random()
      if (temp <= 0.2){
        if (this.state.nodesNumInRow === 50){
          indexes = [379,427,429,467,468,475,476,489,490,516,520,525,526,539,540,555,556,565,571,575,576,605,606,615,619,621,622,627,629,665,671,679,716,720,767,768]
        }else{
          indexes = [932,1030,1032,1120,1121,1128,1129,1142,1143,1219,1223,1228,1229,1242,1243,1308,1309,1318,1324,1328,1329,1408,1409,1418,1422,1424,1425,1430,1432,1518,1524,1532,1619,1623,1720,1721]
        }
      }else if (temp <= 0.4){
        if (this.state.nodesNumInRow === 50){
          indexes = [322,328,372,378,422,423,427,428,518,519,520,523,524,526,527,530,531,532,570,572,574,576,578,580,622,623,627,628,722,723,727,728,770,772,774,776,778,780,818,819,820,823,824,826,827,830,831,832,922,923,927,928,972,978,1022,1028]
        }else{
          indexes = [516, 522, 616, 622, 716, 717, 721, 722, 912, 913, 914, 917, 918, 920, 921, 924, 925, 926, 1014, 1016, 1018, 1020, 1022, 1024, 1116, 1117, 1121, 1122, 1316, 1317, 1321, 1322, 1414, 1416, 1418, 1420, 1422, 1424, 1512, 1513, 1514, 1517, 1518, 1520, 1521, 1524, 1525, 1526, 1716, 1717, 1721, 1722, 1816, 1822, 1916, 1922, 546, 552, 646, 652, 746, 747, 751, 752, 942, 943, 944, 947, 948, 950, 951, 954, 955, 956, 1044, 1046, 1048, 1050, 1052, 1054, 1146, 1147, 1151, 1152, 1346, 1347, 1351, 1352, 1444, 1446, 1448, 1450, 1452, 1454, 1542, 1543, 1544, 1547, 1548, 1550, 1551, 1554, 1555, 1556, 1746, 1747, 1751, 1752, 1846, 1852, 1946, 1952, 576, 582, 676, 682, 776, 777, 781, 782, 972, 973, 974, 977, 978, 980, 981, 984, 985, 986, 1074, 1076, 1078, 1080, 1082, 1084, 1176, 1177, 1181, 1182, 1376, 1377, 1381, 1382, 1474, 1476, 1478, 1480, 1482, 1484, 1572, 1573, 1574, 1577, 1578, 1580, 1581, 1584, 1585, 1586, 1776, 1777, 1781, 1782, 1876, 1882, 1976, 1982, 3516, 3522, 3616, 3622, 3716, 3717, 3721, 3722, 3912, 3913, 3914, 3917, 3918, 3920, 3921, 3924, 3925, 3926, 4014, 4016, 4018, 4020, 4022, 4024, 4116, 4117, 4121, 4122, 4316, 4317, 4321, 4322, 4414, 4416, 4418, 4420, 4422, 4424, 4512, 4513, 4514, 4517, 4518, 4520, 4521, 4524, 4525, 4526, 4716, 4717, 4721, 4722, 4816, 4822, 4916, 4922, 3546, 3552, 3646, 3652, 3746, 3747, 3751, 3752, 3942, 3943, 3944, 3947, 3948, 3950, 3951, 3954, 3955, 3956, 4044, 4046, 4048, 4050, 4052, 4054, 4146, 4147, 4151, 4152, 4346, 4347, 4351, 4352, 4444, 4446, 4448, 4450, 4452, 4454, 4542, 4543, 4544, 4547, 4548, 4550, 4551, 4554, 4555, 4556, 4746, 4747, 4751, 4752, 4846, 4852, 4946, 4952, 3576, 3582, 3676, 3682, 3776, 3777, 3781, 3782, 3972, 3973, 3974, 3977, 3978, 3980, 3981, 3984, 3985, 3986, 4074, 4076, 4078, 4080, 4082, 4084, 4176, 4177, 4181, 4182, 4376, 4377, 4381, 4382, 4474, 4476, 4478, 4480, 4482, 4484, 4572, 4573, 4574, 4577, 4578, 4580, 4581, 4584, 4585, 4586, 4776, 4777, 4781, 4782, 4876, 4882, 4976, 4982]
        }
      }else if(temp <= 0.6){
        if (this.state.nodesNumInRow === 50){
          indexes = [208, 209, 210, 258, 260, 308, 309, 310, 358, 359, 360, 408, 409, 410, 458, 459, 460, 508, 510, 558, 559, 560, 238, 239, 240, 288, 290, 338, 339, 340, 388, 389, 390, 438, 439, 440, 488, 489, 490, 538, 540, 588, 589, 590, 938, 939, 940, 988, 990, 1038, 1039, 1040, 1088, 1089, 1090, 1138, 1139, 1140, 1188, 1189, 1190, 1238, 1240, 1288, 1289, 1290, 868, 869, 870, 918, 920, 968, 969, 970, 1018, 1019, 1020, 1068, 1069, 1070, 1118, 1119, 1120, 1168, 1170, 1218, 1219, 1220]
        }else{
          indexes = [2348, 2349, 2350, 2448, 2450, 2548, 2549, 2550, 2648, 2649, 2650, 2748, 2749, 2750, 2848, 2849, 2850, 2948, 2950, 3048, 3049, 3050]
        }
      }else if (temp <= 0.8){
        if (this.state.nodesNumInRow === 50){
          indexes = [216,217,218,219,220,226,227,228,229,230,265,271,275,281,314,322,324,332,363,373,383,412,434,462,484,512,534,562,584,612,634,662,684,713,733,764,782,815,831,866,880,917,929,968,978,1019,1027,1070,1076,1121,1125,1172,1174,1223,]
        }else{
          indexes = [1424, 1425, 1426, 1427, 1428, 1429, 1437, 1438, 1439, 1440, 1441, 1442, 1523, 1530, 1536, 1543, 1622, 1631, 1635, 1644, 1721, 1732, 1734, 1745, 1820, 1833, 1846, 1919, 1947, 2018, 2048, 2118, 2148, 2218, 2248, 2318, 2348, 2418, 2448, 2518, 2548, 2618, 2648, 2718, 2748, 2818, 2848, 2919, 2947, 3020, 3046, 3121, 3145, 3222, 3244, 3323, 3343, 3424, 3442, 3525, 3541, 3626, 3640, 3727, 3739, 3828, 3838, 3929, 3937, 4030, 4036, 4131, 4135, 4232, 4234, 4333, 1557, 1558, 1559, 1560, 1561, 1562, 1570, 1571, 1572, 1573, 1574, 1575, 1656, 1663, 1669, 1676, 1755, 1764, 1768, 1777, 1854, 1865, 1867, 1878, 1953, 1966, 1979, 2052, 2080, 2151, 2181, 2251, 2281, 2351, 2381, 2451, 2481, 2551, 2581, 2651, 2681, 2751, 2781, 2851, 2881, 2951, 2981, 3052, 3080, 3153, 3179, 3254, 3278, 3355, 3377, 3456, 3476, 3557, 3575, 3658, 3674, 3759, 3773, 3860, 3872, 3961, 3971, 4062, 4070, 4163, 4169, 4264, 4268, 4365, 4367, 4466]

        }
      }
    }else{
      for (let i=0; i < this.state.nodesNum / 10; i++){
        indexes.push(Math.floor(Math.random() * this.state.nodesNum))
      }
    }

    this.setState({activeIndexes: indexes})
    this.resetMovesNum()
    this.stopUpdating()
  }


  activateCell = (index) =>{
    this.setState({ activeIndexes: [...this.state.activeIndexes, index] })    
  }


  deactivateCell = (index) =>{
    this.setState({
      activeIndexes: this.state.activeIndexes.filter(x => x !== index),
    })    
  } 

  
  resetMovesNum = () =>{
    this.setState({movesNum: 0})
  }


  getNeighbours = (i, nodesInRow) => {
    const inFirstRow = (i <= (nodesInRow - 1))
    const inLastRow = (i >= (this.state.nodesNum - nodesInRow))
    const onLeftEdge = ((i % nodesInRow) === 0)
    const onRightEdge = ((i + 1) % nodesInRow === 0)

    const neighbours = [ 
      // left
      (!onLeftEdge) ? i-1 : null,
      // right
      (!onRightEdge) ? i+1 : null,
      // top left
      (!inFirstRow && !onLeftEdge) ? i-(nodesInRow + 1) : null,
      // top middle
      (!inFirstRow) ? i-nodesInRow : null,
      // top right
      (!onRightEdge && !inFirstRow) ? i-(nodesInRow-1) : null,
      // bottom left
      (!inLastRow && !onLeftEdge) ? i+nodesInRow-1 : null,
      // bottom middle
      (!inLastRow) ? i+nodesInRow : null,
      // bottom right
      (!inLastRow && !onRightEdge) ? i+nodesInRow+1 : null,
    ]
    return neighbours
  }

  updateGrid = () => {
    const newActiveIndexes = [];
    const oldActiveIndexes = this.state.activeIndexes;
    const nodesInRow = this.state.nodesNumInRow
    const checkUs = new Set(oldActiveIndexes)

    for (let j of oldActiveIndexes){
      for (let k of this.getNeighbours(j, nodesInRow)){
        checkUs.add(k)
      }
    }

    // for (let i=0; i < this.state.nodesNum; i++){
    for (const i of checkUs){
      // make checks
      const isAlive = (oldActiveIndexes.indexOf(i) !== -1)
      
      const neighbours = this.getNeighbours(i, nodesInRow)

      const liveNeighboursNum = neighbours.filter(x => oldActiveIndexes.indexOf(x) !== -1).length

      if (isAlive){
        if (!(liveNeighboursNum === 2 || liveNeighboursNum === 3)){continue}
      }else{
        if (liveNeighboursNum !== 3){continue}
      }

      newActiveIndexes.push(i)
    }
    
    this.setState({
      activeIndexes: newActiveIndexes,
      movesNum: this.state.movesNum + 1,
    })
  }

  stopUpdating = () => {
    clearInterval(this.state.playing)  // we have setInterval ID here
    this.setState({playing: false})
  }

  handlePlayBtnClick = () => {
    if (this.state.playing === false){
      const intervalID = setInterval(() => this.updateGrid(), 1000 / this.state.movesPerSecond)

      this.setState({playing: intervalID})
    }else{
      this.stopUpdating()
    }
  }

  handleSpeedBtnClick = () => {
    let oldMovesPerSecond = this.state.movesPerSecond
    let newMovesPerSecond

    if(oldMovesPerSecond === 30){
      newMovesPerSecond = 100
    }else if(oldMovesPerSecond === 10){
      newMovesPerSecond = 15
    }else if(oldMovesPerSecond === 15){
      newMovesPerSecond = 30
    }else if (oldMovesPerSecond <= 9){
      newMovesPerSecond = oldMovesPerSecond + 1
    }else{
      newMovesPerSecond = 1
    }

    this.setState({movesPerSecond: newMovesPerSecond})

    // update setinterval function
    if (this.state.playing !== false){
      this.stopUpdating()
      let intervalID = setInterval(() => this.updateGrid(), 1000 / newMovesPerSecond)
      
      this.setState({playing: intervalID})
    }
  }
  
  handleSCreenModeBtnClick = () => {
    let currentMode = this.state.screenModes[this.state.screenModeIndex]
    let lastMode = this.state.screenModes[this.state.screenModes.length - 1]
    let newIndex

    if (currentMode === lastMode){
        newIndex = 0
    }else{
        newIndex = this.state.screenModeIndex + 1
    }

    this.setState({screenModeIndex: newIndex})

    if (newIndex === 0){
      this.setState({ nodesNum: 1500, nodesNumInRow: 50 })
    }else if(newIndex === 1){
      this.setState({ nodesNum: 1800, nodesNumInRow: 50 })
    }else if(newIndex === 2){
      this.setState({ nodesNum: 24 * 34, nodesNumInRow: 24 })
    }else if(newIndex === 3){
      this.setState({ nodesNum: 6000, nodesNumInRow: 100 })
    }
  }

  changeTheme = (theme) => {
    if (this.state.theme !== theme){
      this.setState({theme: theme})
    }
    if (theme === 'dark'){
      document.body.classList.add('dark')
    }else{
      if (document.body.classList.contains('dark')){
        document.body.classList.remove('dark')
      }
    }
  }

  render(){
    return (
      <div id="body" className={this.state.theme}>
        <div id="grid" className={this.state.screenModes[this.state.screenModeIndex]}>
          <TopButtons
            changeTheme={this.changeTheme}
            screenModeNumber={this.state.screenModeIndex + 1}
            handleSCreenModeBtnClick={this.handleSCreenModeBtnClick}
            handleSpeedBtnClick={this.handleSpeedBtnClick}
            movesNum={this.state.movesNum}
            movesPerSecond={this.state.movesPerSecond}/>
          {this.nodes()}
          <BottomButtons
            handlePlayBtnClick={this.handlePlayBtnClick}
            clearGrid={this.clearGrid}
            generateRandom={this.generateRandom}
            changeColor={this.changeColor}/>
        </div>
      </div>
    );
  }
}

export default App;
