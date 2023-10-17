import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from ".";

describe("formulário", () => {
  test("renderizando o form e o botão de save", () => {
    const addTodo = jest.fn();
    render(<Form addTodo={addTodo} />);
    expect(
      screen.getByPlaceholderText("Text your task here!")
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Text your task here!");
    fireEvent.change(input, { target: { value: "Teste 1" } });
    fireEvent.click(screen.getByText("Save"));
    expect(addTodo).toHaveBeenCalledWith("Teste 1");
    expect(screen.queryByText("Texte your task here!")).toBeNull();
  });

  test("cancelando o form", () => {
    render(<Form addTodo={() => {}} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Text your task here!")).toBeNull();
  });
});
