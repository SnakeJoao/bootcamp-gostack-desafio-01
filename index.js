const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkId(req, res, next) {
  const { id } = req.params;

  const index = projects.find(i => i.id == id);

  if (!index) {
    return res.status(400).json({ message: "Projeto não encontrado" });
  }

  return next();
}

function countRequest(req, res, next) {
  console.count("Requisições");

  return next();
}

server.use(countRequest);

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(i => i.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(i => i.id == id);

  projects.splice(index, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(i => i.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
