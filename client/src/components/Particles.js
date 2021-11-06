import Particles from 'react-tsparticles'

const ParticlesComponent = ({ theme }) => {
  const linkColor = theme === 'dark' ? '#ffffff' : '#000000'
  return (
    <Particles
      params={{
        fpsLimit: 60,
        backgroundMode: {
          enable: true,
          zIndex: 0,
        },
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: '#01ccff',
            animation: {
              enable: true,
              speed: 10,
              sync: true,
            },
          },
          stroke: {
            width: 1,
          },
          size: {
            value: 2,
            random: true,
            animation: {
              enable: false,
              speed: 5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 100,
            color: linkColor,
            opacity: 0.2,
            width: 3,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            outMode: 'out',
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.6,
              },
            },
            bubble: {
              distance: 400,
              size: 2,
              duration: 2,
              opacity: 0.2,
            },
            repulse: {
              distance: 100,
            },
          },
        },
        detectRetina: true,
        background: {
          size: 'cover',
        },
      }}
    />
  )
}

export default ParticlesComponent
