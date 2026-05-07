import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {     //Cadastro de usuário, com validação de senha e confirmação de senha, além de feedback visual durante o processo de cadastro.

  const navigate = useNavigate()  // Hook para navegação entre páginas
  
  const [isLoading, setIsLoading] = useState<boolean>(false) // Estado para controlar o carregamento durante o processo de cadastro

  const[confirmarSenha, setConfirmarSenha] = useState<string>("") // Estado para armazenar a senha de confirmação, garantindo que o usuário digite a mesma senha duas vezes para evitar erros de digitação

  const [usuario, setUsuario] = useState<Usuario>({ // Estado para armazenar os dados do usuário que está sendo cadastrado, incluindo nome, usuário, senha e foto
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })
  
  useEffect(() => {        // Efeito colateral para verificar se o usuário já está logado. Se o ID do usuário for diferente de 0, significa que ele já está logado e será redirecionado para a página de login.
    if (usuario.id !== 0){     // Verifica se o usuário já está logado
      retornar()   // Redireciona para a página de login
    }
  }, [usuario])

  function retornar(){   // Função para redirecionar o usuário para a página de login
    navigate('/login')   // Redireciona para a página de login
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){    // Função para atualizar o estado do usuário com base nas mudanças nos campos de entrada. Ela utiliza a sintaxe de espalhamento para manter os valores anteriores do usuário e atualiza apenas o campo que foi modificado.
    setUsuario({                           // Atualiza o estado do usuário com os novos valores dos campos de entrada
      ...usuario,                // Mantém os valores anteriores do usuário
      [e.target.name]: e.target.value          // Atualiza o campo específico que foi modificado com o novo valor
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){         // Função para atualizar o estado da senha de confirmação com base nas mudanças no campo de entrada. Ela é chamada quando o usuário digita na caixa de confirmação de senha, garantindo que o valor seja atualizado corretamente.
    setConfirmarSenha(e.target.value)             // Atualiza o estado da senha de confirmação com o novo valor do campo de entrada
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){        // Função assíncrona para lidar com o processo de cadastro do usuário. Ela é chamada quando o formulário é submetido, realizando a validação das senhas e, se tudo estiver correto, fazendo a requisição para cadastrar o usuário no backend.
    e.preventDefault()           // Previne o comportamento padrão do formulário, que é recarregar a página ao ser submetido

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){      // Verifica se a senha de confirmação é igual à senha digitada e se a senha tem pelo menos 8 caracteres, garantindo que o usuário forneça uma senha segura e que as duas senhas coincidam para evitar erros de digitação.

      setIsLoading(true)           // Define o estado de carregamento como verdadeiro para indicar que o processo de cadastro está em andamento, permitindo que o feedback visual seja exibido durante a operação assíncrona de cadastro do usuário.

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario) // Faz a requisição para cadastrar o usuário no backend, utilizando a função cadastrarUsuario que é importada do serviço. Ela envia os dados do usuário e atualiza o estado do usuário com a resposta da requisição, permitindo que o aplicativo reaja às mudanças no estado do usuário após o cadastro.
        alert('Usuário cadastrado com sucesso!')  // Exibe um alerta para informar o usuário que o cadastro foi realizado com sucesso, proporcionando feedback positivo após a conclusão do processo de cadastro.
      }catch(error){                   // Em caso de erro durante o processo de cadastro, exibe um alerta para informar o usuário sobre o problema, permitindo que ele saiba que algo deu errado e possa tomar as medidas necessárias para corrigir o erro ou tentar novamente.
        alert('Erro ao cadastrar o usuário!') // Exibe um alerta para informar o usuário que houve um erro durante o processo de cadastro, proporcionando feedback negativo e permitindo que ele saiba que o cadastro não foi concluído com sucesso.
      }
    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')      // Exibe um alerta para informar o usuário que os dados fornecidos são inconsistentes, como senhas que não coincidem ou senhas que não atendem aos requisitos de segurança, permitindo que ele corrija as informações antes de tentar cadastrar novamente.
      setUsuario({...usuario, senha: ''})           // Limpa o campo de senha no estado do usuário, garantindo que o usuário precise digitar a senha novamente para corrigir o erro, promovendo a segurança e a correção dos dados fornecidos.
      setConfirmarSenha('')    // Limpa o campo de confirmação de senha, garantindo que o usuário precise digitar a senha de confirmação novamente para corrigir o erro, promovendo a segurança e a correção dos dados fornecidos.
    }

    setIsLoading(false)        // Define o estado de carregamento como falso para indicar que o processo de cadastro foi concluído, permitindo que o feedback visual seja atualizado para refletir o término da operação assíncrona de cadastro do usuário.
  }

  return (  // Retorna o JSX que representa a interface de cadastro do usuário, incluindo um formulário com campos para nome, usuário, foto, senha e confirmação de senha, além de botões para cancelar ou cadastrar. O layout é responsivo, com uma imagem de fundo exibida em telas maiores e o formulário centralizado na tela.
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center"
        ></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
              onSubmit={cadastrarNovoUsuario}>

          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.nome}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.usuario}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.foto}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.senha}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button 
                type='reset'
                className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
                onClick={retornar}
             >
                Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center' 
                >
                { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={24}
                  /> : 
                  <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro