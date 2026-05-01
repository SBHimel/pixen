
import { Button } from '@heroui/react';
import Link from 'next/link';


const Category = async () => {


    const res = await fetch('https://pixen-pearl.vercel.app/category.json')
    const categories = await res.json()



    // console.log(categories);
    return (
        <div className='mb-5 space-x-3'>
            {
                categories.map(category => (
                    <Link href={`?category=${category.name.toLowerCase()}`} key={category.id}>
                        <Button size='sm' variant='outline'>
                            {category.name}
                        </Button>
                    </Link>
                ))
            }
        </div>
    );
};

export default Category;