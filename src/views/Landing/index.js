import React from "react"
import Home from "components/home/Home"
import LandingModal from "components/backdrop/LandingModal"
import Fred from "../../assets/images/218000022.jpeg";
import Fridaus from "../../assets/images/218005322.jpg";
import Fatina from "../../assets/images/217101232.jpg";

const Landing = (props) => {
    const [state, setState] = React.useState(false)
    return (
		<div class="p-9 ">
			<div class=" flex mx-auto">
				<div class="flex-1 flex items-center">
					<div class="w-full">
						<h1 class=" text-gray-500 text-3xl">
							Tech services management system
						</h1>
						<h1 class="font-bold text-blue-500 text-6xl">
							Find an expert
						</h1>
						<h1 class="font-bold text-gray-600 mt-2 text-6xl">
							with few click
						</h1>
						<p class="mt-2 text-xl w-2/3 text-gray-500">
							We help you to connect clients and technician in an
							easy way in order to solve or provide client’s
							service
						</p>
						<div class="mt-4">
							<button
								onClick={() => setState(!state)}
								class="py-3 px-5 rounded text-xl mr-1 bg-blue-400 hover:bg-blue-500 text-white">
								Get Started
							</button>
							{/* <button
								onClick={() => setState(!state)}
								class="py-2 px-5 rounded text-xl mr-1 hover:bg-blue-500 hover:text-white text-blue-500 border-2 border-blue-500">
								Login
							</button> */}
						</div>
					</div>
				</div>
				<div class="flex-1">
					<img
						src="https://images.pexels.com/photos/3825580/pexels-photo-3825580.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
						alt=""
						class="rounded w-full"
					/>
				</div>
			</div>
			<div class=" mx-auto text-center py-8 bg-blue-50 mt-8">
				<h3 class="text-2xl text-bold text-blue-500 font-bold">
					Our Team Can Help You
				</h3>
				<p class="flex justify-between justify-around mt-2 w-2/3 mx-auto text-gray-600">
					<img src={Fred} alt="" class="rounded w-32" />
					<img src={Fridaus} alt="" class="rounded w-32" />
					<img src={Fatina} alt="" class="rounded w-32" />
				</p>
				<p class="flex justify-between justify-around mt-2 w-2/3 mx-auto text-gray-600">
					<span>Rwagatenga Fred</span>
					<span>Uwase Fridaus</span>
					<span>Ineza Fatina</span>
				</p>
			</div>

			{/* <div class=" mx-auto text-center py-8 bg-blue-50 mt-8">
				<h3 class="text-2xl text-bold text-blue-500 font-bold">
					Hello this is the team
				</h3>
				<p class="mt-2 w-2/3 mx-auto text-gray-600">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Aspernatur molestiae totam, repellat eveniet aliquam enim
					labore perspiciatis rerum excepturi quo earum tenetur.
				</p>
			</div> */}
			<LandingModal open={state} close={() => setState(!state)}>
				<Home />
			</LandingModal>
		</div>
	);
}

export default Landing;