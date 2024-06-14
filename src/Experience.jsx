import { OrbitControls, Text3D, Center, useMatcapTexture} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1,0.6,16,32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const [ matcapTexture ] = useMatcapTexture('8B892C_D4E856_475E2D_47360A', 256)

    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    },[])

    const donuts = useRef([])

    useFrame((state, delta) => {
        for(const donut of donuts.current){
            donut.rotation.y += delta * 0.1
        }
    })

    // const { backgroundColor } = useControls({
    //     backgroundColor: '#f2eda2',
    // })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <color args={['#f2eda2']} attach='background'/>

        <Center>
            <Text3D 
                font='./fonts/helvetiker_regular.typeface.json'
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.08 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
                material={ material }
            >
                LEO VILLA
            </Text3D>
        </Center>
        {[...Array(100)].map((value, index) => 
            <mesh
                key={ index }
                ref={ (element) => donuts.current[index] = element }
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                ]}
                scale={ 0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
                geometry={ torusGeometry }
                material={ material }
            />
        )}
    </>
}