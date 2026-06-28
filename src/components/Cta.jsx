export default function Cta() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="py-16 bg-linear-to-l from-yellow-500 via-green-200 to-olive-400 w-full text-center px-2">
                <p className="text-xl font-medium text-slate-600">Let’s work together!</p>
                <h2 className="font-medium text-slate-800 text-4xl max-w-lg mx-auto my-4">For work inquires feel free to get in touch with me</h2>
                <a href="contact@prebuiltui.com" className="text-lg text-slate-600">contact@prebuiltui.com</a>
            </section>
        </>
    );
};
