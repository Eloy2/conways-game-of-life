import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import styled from 'styled-components';

const OuterDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Header = styled.header`
    margin: 2%;
    padding .5% 3% .5% 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: #202630;
    box-shadow:  8px 8px 16px #1b2029, 
                -8px -8px 16px #252c37;
`
const Title = styled.h2`
    color: #9d03fc;
`

const MidDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 2% 0;
`

const BottomDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 0 2% 0;
`

const SettingDiv1 = styled.div`
    margin-bottom: 1.5%;
    width: 55%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const SettingDiv2 = styled.div`
    padding: 1.7% 0 1.7% 0;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 15px;
    background: #323845;
    box-shadow: inset 6px 6px 12px #2b303b, 
                inset -6px -6px 12px #3a404f;
`

const ButtonOff = styled.div`
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
    cursor: pointer;
    font-weight: bold;
    color: #9d03fc;
    padding: 1% 3% 1% 3%;
    border-radius: 15px;
    background: linear-gradient(145deg, #222933, #1d222b);
    box-shadow:  4px 4px 8px #1b2029, 
                -4px -4px 8px #252c37;
    &:hover {
        background: white;
        border-radius: 15px;
        background: linear-gradient(145deg, #ffffff, #e6e6e6);
        box-shadow:  4px 4px 9px #d9d9d9, 
             -4px -4px 9px #ffffff;
    }
`

const ButtonOn = styled.div`
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ and Edge */
    user-select: none; /* Standard syntax */
    cursor: pointer;
    font-weight: bold;
    color: #9d03fc;
    padding: 1% 3% 1% 3%;
    background: white;
    border-radius: 15px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow:  4px 4px 9px #d9d9d9, 
            -4px -4px 9px #ffffff;

`

const H3 = styled.h3`
    color: #9d03fc;
`

// let speed = 1000;

const moves = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

function Grid() { // MAIN GRID COMPONENT
  const [speed, setSpeed] = useState(1000)

  const [settings, setSettings] = useState({
    numRows: 25,
    numCols: 60,
  })

  const [gen, setGen] = useState(0);

  const make2DArray = () => { // make 2d array full of zero's
    const rows = [];
    for (let i = 0; i < settings.numRows; i++) {
        rows.push(Array.from(Array(settings.numCols), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => { // set up state for grid
    return make2DArray();
  });

  const [running, setRunning] = useState(false); // set up flag and check if it is running

  const runningRef = useRef(running); // allows me to get the current value of running
  runningRef.current = running;

  const speedRef = useRef(speed); // allows me to get the current value of speed
  speedRef.current = speed;

  const runSimulation = useCallback(() => { // usecallback uses memoization to optimize function calls
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < settings.numRows; i++) {
          for (let k = 0; k < settings.numCols; k++) {
            let neighbors = 0;
            moves.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < settings.numRows && newK >= 0 && newK < settings.numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setGen(gen => (gen + 1))

    setTimeout(runSimulation, speedRef.current);
  }, []);

  const runStep = () => {

    setGrid(g => {
        return produce(g, gridCopy => {
            for (let i = 0; i < settings.numRows; i++) {
                for (let k = 0; k < settings.numCols; k++) {
                let neighbors = 0;
                moves.forEach(([x, y]) => {
                    const newI = i + x;
                    const newK = k + y;
                    if (newI >= 0 && newI < settings.numRows && newK >= 0 && newK < settings.numCols) {
                    neighbors += g[newI][newK];
                    }
                });

                if (neighbors < 2 || neighbors > 3) {
                    gridCopy[i][k] = 0;
                } else if (g[i][k] === 0 && neighbors === 3) {
                    gridCopy[i][k] = 1;
                }
                }
        }
        });
    });

    setGen(gen => (gen + 1))

  }

  return (
    <OuterDiv>
        <Header><Title>Generation #: {gen}</Title></Header>
        <MidDiv>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${settings.numCols}, 21px)`,
          background: "#323845",
          boxShadow: "inset 20px 20px 40px #2b303b, inset -20px -20px 40px #3a404f",
        }}>
            {grid.map((rows, i) =>
            rows.map((col, k) => (
                <div
                key={`${i}-${k}`}
                onClick={() => {
                    if (!running) {
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                        });
                        setGrid(newGrid);   
                    }
                }}
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: grid[i][k] ? "#9d03fc" : undefined,
                    border: "solid .1px rgba(32, 38, 48, .5)" //#202630 <-- Is the hex of the color the .5 in rgba() is for 50% transparency
                }}
                />
            ))
            )}
        </div>
        </MidDiv>
        <BottomDiv>
            <SettingDiv1>
                {running ? 
                <ButtonOn
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                    }}
                >Stop</ButtonOn>
                : 
                <ButtonOff
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                    }}
                >Start</ButtonOff>}
                <ButtonOff
                    onClick={() => {
                    const rows = [];
                    for (let i = 0; i < settings.numRows; i++) {
                        rows.push(
                        Array.from(Array(settings.numCols), () => (Math.random() > 0.7 ? 1 : 0))
                        );
                    }

                    setGrid(rows);
                    }}
                >
                    Random
                </ButtonOff>
                <ButtonOff
                    onClick={() => {
                        setGen(0);
                        setGrid(make2DArray());
                    }}
                >
                    Clear
                </ButtonOff>
                <ButtonOff
                    onClick={() => {
                        runStep();
                    }}
                >
                    Step
                </ButtonOff>
                
            </SettingDiv1>
            <SettingDiv2>
                <H3>Speeds: </H3>
                {speed === 1000 ? <ButtonOn>Slow</ButtonOn> : <ButtonOff onClick={() => setSpeed(1000)}>Slow</ButtonOff>}
                {speed === 500 ? <ButtonOn>Medium</ButtonOn> : <ButtonOff onClick={() => setSpeed(500)} >Medium</ButtonOff>}
                {speed === 100 ? <ButtonOn>Fast</ButtonOn> : <ButtonOff onClick={() => setSpeed(100)}>Fast</ButtonOff>}
            </SettingDiv2>
        </BottomDiv>
    </OuterDiv>
  );
};

export default Grid;
