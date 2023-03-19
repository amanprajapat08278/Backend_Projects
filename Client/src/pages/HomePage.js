import React from 'react'
import "../CSS/Home.css"
import Navbar from '../Componenets/Navbar'

function HomePage() {
  return (
    <div id='bigBoxHome'>
        <Navbar/>
        <div className='home-pic'>
          {/* <img className='home-pic' src="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg" alt="" /> */}
          <p className='tag-h'>Open your mind to endless possibilities</p>
        </div>
        <div className='promo'>  
          <h2>Indias Best Book Shop</h2>
        </div>

        <div className='ab'>
          <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptatum iusto molestiae, obcaecati nemo fugit. Error, deserunt quaerat? Odit eius eaque aliquid nulla! Sequi dolor perspiciatis ab maxime molestiae, nostrum ea sit? Porro, deserunt! Quasi odit consectetur assumenda unde sequi natus dolor velit nisi exercitationem! Quod sunt aliquam provident sit reprehenderit officia alias fuga in vitae atque, ad commodi at nam facere asperiores autem non ut repudiandae vel ipsam voluptatum! Dolores sunt harum inventore non ratione esse qui error vero sint quisquam quo nihil modi explicabo culpa hic ducimus alias aliquid et earum sed, accusamus voluptates facere? Ratione vero debitis, quae, at optio alias fugiat, impedit provident vitae dolorum inventore similique. Voluptates sint expedita officia at! Blanditiis quia quam error ut! Quos nulla aut minima cum iste quisquam distinctio neque numquam totam explicabo sint nobis repellendus itaque molestiae, at, animi nesciunt. Ea doloribus veniam illum dolorum libero eos atque rerum Ipsa voluptatum iusto molestiae, obcaecati nemo !</h4>
        </div>

        <div className='foot'>
          <h5>Created By 💓</h5>
        </div>

    </div>
  )
}

export default HomePage
