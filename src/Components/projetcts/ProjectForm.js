function ProjectForm (){
    return(
        <form>
            <div>
                <input type="text" placeholder="Insira o nome do projeto" />
            </div>
            <div>
                <input type="number" placeholder="Insira o valor do orçamento total" />
            </div>
            <div>
                <select name="category_id">
                    <option disabled>Selecione a categoria</option>
                    <option>teste1</option>
                    <option>teste2</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar Projeto" />
            </div>

        </form>
    )
}

export default ProjectForm