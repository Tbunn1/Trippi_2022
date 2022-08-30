# TRIPPI Template

## Running the backend
- in the project root
- to start in vscode's terminal run:
```bash
docker compose up
```
- to stop, in vscode's terminal hit: `ctrl` + `c`
- to remove the docker images (freeing up space), in vscode's terminal simply run:
```bash
docker compose down
```
- to test that the server is running go to: `http://0.0.0.0:8080` -> this site will say: `Trippi Backend is running!`
- To "seed" data go to `http://0.0.0.0:8080/seed` -> then follow the instructions.

## Running the fontend
- open another terminal in vscode
- ensure you are in the project root directory
- change directory into the `fontend` directory, like so:
```bash
cd frontend
```
- if this is the first time running the app, install dependencies, like so:
```bash
npm install
```
- to run the app, simply: 
```bash
npm start
```
- to stop the app, in vscode's terminal hit: `ctrl` + `c`
