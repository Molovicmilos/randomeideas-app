import IdeasAPI from "../services/IdeasAPI";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    this._ideas = [];
    this._validTags = new Set();
    this.getIdeas();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasAPI.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // delete from server
      const res = await IdeasAPI.deleteIdea(ideaId);

      //remove from DOM
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    // Clear the idea list before rendering ideas
    this._ideaListEl.innerHTML = "";
    /* this._ideas.forEach((idea) => {
      const li = document.createElement("li");
      li.classList.add("idea");
      li.dataset.id = idea.id;
      const h5Text = document.createTextNode(idea.text);
      const spanTag = document.createElement("span");
      spanTag.classList.add("tag");
      const spanUsername = document.createElement("span");
      spanUsername.classList.add("username");
      const smallDate = document.createElement("small");
      smallDate.innerText = `Added ${idea.date}`;
      spanTag.appendChild(document.createTextNode(`#${idea.tag} `));
      spanUsername.appendChild(document.createTextNode(`- ${idea.username}`));
      li.append(h5Text, spanTag, spanUsername, smallDate);
      this._ideaListEl.appendChild(li);
    }); */
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? '<button class="delete"><i class="fas fa-times"></i></button>'
            : "";
        return `<div class="card" data-id="${idea._id}">
                ${deleteBtn}
                <h3>
                  ${idea.text}
                </h3>
                <p class="tag ${tagClass}">${idea.tag}</p>
                <p>
                  Posted on <span class="date">${idea.date}</span> by
                  <span class="author">${idea.username}</span>
                </p>
              </div>`;
      })
      .join("");

    this.addEventListeners();
  }
}

export default IdeaList;
