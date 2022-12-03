import { useState } from 'react';
import sample from 'lodash/sample';

const samplePrompts = [
  'a gentleman otter in a 19th century portrait',
  'bowl of ramen in the style of a comic book',
  'flower field drawn by Jean-Jacques Sempé',
  'illustration of a taxi cab in the style of r crumb',
  'multicolor hyperspace',
  'painting of fruit on a table in the style of Raimonds Staprans',
  'pencil sketch of robots playing poker',
  'photo of an astronaut riding a horse',
];

const StableDiffusionPrompt = (props) => {
  const [prompt] = useState(sample(samplePrompts));
  const [image, setImage] = useState(null);
  const [counter, setCounter] = useState(0);

  return (
    <form
      // eslint-disable-next-line react/destructuring-assignment
      onSubmit={props.onSubmit}
      className="py-5 animate-in fade-in duration-700"
    >
      <div className="flex max-w-[512px]">
        <input
          type="text"
          defaultValue={prompt}
          name="prompt"
          placeholder="Enter a prompt..."
          className="block w-full flex-grow rounded-l-md border border-solid border-gray-300 rounded-md px-4 py-2"
        />

        <button
          className="bg-black text-white rounded-r-md text-small inline-block px-3 flex-none"
          type="submit"
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default StableDiffusionPrompt;
