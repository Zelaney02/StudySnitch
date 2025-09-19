import Link from 'next/link';

// jerry delete this for the python analytics stuff
function Finished() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Finished!</h1>
        <p className="text-xl mb-4">Congratulations on completing your scheduled tasks.</p>
        <Link href="/landing" className="text-blue-500 hover:underline">
            Go back to home
        </Link>
    </div>
  );
}

export default Finished;