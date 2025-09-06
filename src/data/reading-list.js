// src/data/reading-list.js
export const readingData = {
  books: [
    {
      id: 1,
      title: "The Language Instinct",
      author: "Steven Pinker",
      genre: "Psycholinguistics",
      rating: 4,
      status: "completed",
      dateAdded: "2024-01-15",
      notes: "Pinker's exploration of language as an instinct provides fascinating insights...",
      keyInsight: "Language is not a cultural artifact that we learn the way we learn to tell time...",
      tags: ["psycholinguistics", "language-acquisition", "cognitive-science"]
    },
    {
      id: 2,
      title: "Metaphors We Live By",
      author: "Lakoff & Johnson",
      genre: "Cognitive Linguistics",
      rating: 5,
      status: "completed",
      dateAdded: "2024-01-20",
      notes: "Revolutionary work that shows how metaphors structure our understanding...",
      keyInsight: "The essence of metaphor is understanding and experiencing one kind of thing in terms of another.",
      tags: ["cognitive-linguistics", "metaphor", "conceptual-structure"]
    }
  ],
  
  papers: [
    {
      id: 1,
      title: "Attention Is All You Need",
      authors: "Vaswani et al.",
      year: 2017,
      field: "Natural Language Processing",
      status: "read",
      notes: "The transformer architecture that revolutionized NLP...",
      tags: ["transformer", "attention", "nlp"]
    }
  ],
  
  fiction: [
    {
      id: 1,
      title: "The Joy Luck Club",
      author: "Amy Tan",
      genre: "Fiction",
      rating: 4,
      status: "completed",
      notes: "Explores the complexities of communication across generations...",
      tags: ["fiction", "cultural-identity", "multilingual"]
    }
  ]
};

// 工具函数
export function getBooksByStatus(status) {
  return readingData.books.filter(book => book.status === status);
}

export function getBooksByGenre(genre) {
  return readingData.books.filter(book => book.genre === genre);
}

export function addNewBook(bookData) {
  const newBook = {
    id: Math.max(...readingData.books.map(b => b.id)) + 1,
    dateAdded: new Date().toISOString().split('T')[0],
    ...bookData
  };
  readingData.books.push(newBook);
  return newBook;
}
