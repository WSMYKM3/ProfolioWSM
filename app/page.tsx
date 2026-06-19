import TopNav from './components/TopNav';
import HomeWheel from './components/HomeWheel';

export default function Home() {
  return (
    <div className="layout editorial home-wheel-layout">
      <TopNav />
      <main className="home-wheel-page">
        <HomeWheel tag="Creative Technologist & Engineer — computational arts, real-time systems, immersive media." />
      </main>
    </div>
  );
}
