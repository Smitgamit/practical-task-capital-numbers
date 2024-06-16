import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: { movieId: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { movieId } = params;
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(movieId);
    }, 100);
  });
  return {
    title: `Movie ${title}`,
  };
};
async function ProductDetails({ params }: Props) {
  const detailsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}?i=${params.movieId}&apikey=fc1fef96`
  );
  const details = await detailsResponse.json();
  return (
    <main className="p-4">
      <div
        className="bg-cover bg-center h-64 rounded-lg mb-4"
        style={{ backgroundImage: `url(${details?.Poster})` }}
      ></div>

      <div className="flex flex-col md:flex-row items-start">
        <Image
          width={100}
          height={100}
          src={details?.Poster}
          alt={`${details?.Title} poster`}
          className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
        />
        <div className="md:ml-6">
          <h1 className="text-4xl font-bold mb-2">{details?.Title}</h1>
          <p className="mb-4">{details?.Plot}</p>
          <p className="mb-2">
            <strong>Rating:</strong> {details?.imdbRating}
          </p>
          <p className="mb-2">
            <strong>Release Date:</strong> {details?.Released}
          </p>
          <p className="mb-2">
            <strong>Run Time:</strong> {details?.Runtime}
          </p>
          <p className="mb-2">
            <strong>Genres:</strong> {details?.Genre}
          </p>
        </div>
      </div>
    </main>
  );
}
export default ProductDetails;
