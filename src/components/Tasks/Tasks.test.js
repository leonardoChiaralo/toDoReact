import React from "react";
import Tasks from ".";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Bloco de Tasks", () => {
  test("renderizar a task com texto", () => {
    const todo = { _id: 1, text: "Teste 1", isCompleted: false };
    render(<Tasks todo={todo} />);
    const taskElement = screen.getByText("Teste 1");
    expect(taskElement).toBeInTheDocument();
  });

  test('marcar a task como completa depois de clicar no botão "complete"', () => {
    const todo = { _id: 2, text: "Teste 2", isCompleted: false };
    const completeTodo = jest.fn();
    render(<Tasks todo={todo} completeTodo={completeTodo} />);
    const completeButton = screen.getByText("Complete");
    fireEvent.click(completeButton);
    expect(completeTodo).toHaveBeenCalledWith(2);
  });

  test("remover a task depois de clicar no botão 'x'", () => {
    const todo = { _id: 3, text: "Teste 3", isCompleted: false };
    const removeTodo = jest.fn();
    render(<Tasks todo={todo} removeTodo={removeTodo} />);
    const removeButton = screen.getByText("X");
    fireEvent.click(removeButton);
    expect(removeTodo).toHaveBeenCalledWith(3);
  });
});
