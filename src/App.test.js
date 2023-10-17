import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

const mock = new MockAdapter(axios);

mock
  .onGet("/list")
  .reply(200, [{ _id: 1, text: "Teste 1", isCompleted: false }]);

mock.onDelete("/list/1").reply(204);

mock.onPut("/list/1").reply(204);

describe("chamada da API", () => {
  test("renderizando as tasks via GET", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Teste 1")).toBeInTheDocument();
    });
  });

  test("adicionando tasks via POST", async () => {
    render(<App />);

    const taskList = [];

    mock.onPost("/").reply((config) => {
      const data = JSON.parse(config.data);

      console.error("teste:", config);
      taskList.push({ _id: 2, text: data.text, isCompleted: false });

      return [201, taskList[0]];
    });

    mock.onGet("/list").reply((config) => {
      return [200, taskList];
    });

    const addTasks = screen.getByText("Add Task");
    fireEvent.click(addTasks);

    const inputElement = screen.getByPlaceholderText("Text your task here!");
    fireEvent.change(inputElement, { target: { value: "Nova Tarefa" } });

    const addButton = screen.getByText("Save");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Nova Tarefa")).toBeInTheDocument();
    });
  });
});
