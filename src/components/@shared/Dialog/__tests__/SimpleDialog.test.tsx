import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SimpleDialog } from "../SimpleDialog"; // Ajuste o caminho conforme necessário
import { Button } from "@mui/material";

const itemOpen = <Button>Abrir Diálogo</Button>;

describe("SimpleDialog", () => {
  it("renderiza o componente e verifica interação", async () => {
    render(
      <SimpleDialog
        fullWidth={true}
        itemOpen={itemOpen}
        title="Título do Diálogo"
      >
        Conteúdo do Diálogo
      </SimpleDialog>,
    );

    // Verifica se o botão para abrir o diálogo está presente
    const openButton = screen.getByText("Abrir Diálogo");
    expect(openButton).toBeInTheDocument();

    // Simula o clique no botão para abrir o diálogo
    fireEvent.click(openButton);

    // Verifica se o título do diálogo está presente após aberto
    const dialogTitle = await screen.findByText("Título do Diálogo");
    expect(dialogTitle).toBeInTheDocument();

    // Verifica se o conteúdo do diálogo está presente após aberto
    const dialogContent = screen.getByText("Conteúdo do Diálogo");
    expect(dialogContent).toBeInTheDocument();

    // Simula o clique no botão de fechar o diálogo
    const closeButton = screen.getByTestId("icon-close");
    fireEvent.click(closeButton);

    // Aguarda até que o diálogo seja removido do DOM
    await waitFor(
      () => {
        expect(screen.queryByText("Título do Diálogo")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
});
