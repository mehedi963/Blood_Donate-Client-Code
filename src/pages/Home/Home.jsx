import Banner from '../../components/Home/Banner'
import Contact from '../../components/Home/Contact'
import HeroSection from '../../components/Home/HeroSection'
import Plants from '../../components/Home/Plants'



const Home = () => {
  return (
    <div>
     <section >
       <Banner></Banner>
     </section>
     <section >
       <HeroSection></HeroSection>
     </section>
     <Contact></Contact>
      
    </div>
  )
}

export default Home
