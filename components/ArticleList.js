import ArticleItem from './ArticleItem'
import articleStyles from '../styles/Article.module.css'

export default function ArticleList( {articles} ) {
  return (
    <div className={articleStyles.grid}>
      {articles.map(article => 
        <ArticleItem article={article} key={article.id}/>
      )}
    </div>
  )
}
