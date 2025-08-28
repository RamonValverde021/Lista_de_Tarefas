Aqui está o trecho:

```js
const tarefas = Array.from(grupoTarefas.querySelectorAll("option")).map(opt => opt.textContent);
```

---

### 🔎 Explicação passo a passo

1. **`grupoTarefas.querySelectorAll("option")`**

   * O `grupoTarefas` provavelmente é o seu `<select>` que contém as tarefas.
   * `querySelectorAll("option")` pega **todas as opções (`<option>`) dentro do select**.
   * O retorno disso é um **NodeList** (não é um array "puro").

   Exemplo:

   ```html
   <select id="grupoTarefas">
     <option>Comprar pão</option>
     <option>Estudar JavaScript</option>
   </select>
   ```

   Esse comando retorna algo como:
   `[option, option]`

---

2. **`Array.from(...)`**

   * Converte o `NodeList` em um **array real de JavaScript**.
   * Isso permite usar métodos como `.map()`, `.filter()`, etc.
   * Agora temos algo assim:

     ```js
     [optionElement1, optionElement2, ...]
     ```

---

3. **`.map(opt => opt.textContent)`**

   * O `.map()` percorre cada item do array (cada `<option>`).
   * `opt.textContent` pega **o texto dentro da option**.
   * Retorna um novo array **só com os textos**.

   Exemplo:

   ```js
   ["Comprar pão", "Estudar JavaScript"]
   ```

---

### 🚀 Resultado final

A variável `tarefas` vai conter um array de **strings** com o texto de cada `<option>` do select.

Ou seja:

```js
const tarefas = ["Comprar pão", "Estudar JavaScript"];
```

---