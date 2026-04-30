import React from 'react';
import Image from 'next/image';
// Divider এর পরিবর্তে Separator ইমপোর্ট করা হয়েছে
import { Button, Chip, Card, Separator } from '@heroui/react'; 
import { FaHeart, FaRegCopy, FaCalendarAlt } from 'react-icons/fa';
import { BiDownload, BiInfoCircle, BiImageAlt } from 'react-icons/bi';
import { MdModelTraining } from 'react-icons/md';

const PhotoDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch('https://pixen-pearl.vercel.app/data.json');
    const photos = await res.json();
    const photo = photos.find(p => p.id == id);

    if (!photo) return <div className="text-center py-20 font-bold">Photo Not Found!</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Image */}
                <div className="lg:col-span-7">
                    <Card className="overflow-hidden border shadow-sm">
                        <div className="relative w-full h-[500px] lg:h-[600px] bg-zinc-50">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.title}
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </Card>
                </div>

                {/* Right Side: Details */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div>
                        <div className="flex justify-between items-start gap-2">
                            <h1 className="text-3xl font-bold text-zinc-800">{photo.title}</h1>
                            <Chip color="primary" variant="flat">{photo.category}</Chip>
                        </div>
                        <div className="flex gap-4 mt-3 text-zinc-500">
                            <span className="flex items-center gap-1 font-medium"><FaHeart className="text-red-500" /> {photo.likes}</span>
                            <span className="flex items-center gap-1 font-medium"><BiDownload className="text-blue-500" /> {photo.downloads}</span>
                        </div>
                    </div>

                    <Separator /> {/* এখানে Divider এর বদলে Separator */}

                    <div className="bg-zinc-100 p-4 rounded-xl relative group">
                        <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Prompt</p>
                        <p className="text-sm text-zinc-700 italic leading-relaxed">"{photo.prompt}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                            <MdModelTraining className="text-xl text-primary" />
                            <div>
                                <p className="text-[10px] uppercase text-zinc-400">Model</p>
                                <p className="text-sm font-semibold">{photo.model}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                            <BiImageAlt className="text-xl text-primary" />
                            <div>
                                <p className="text-[10px] uppercase text-zinc-400">Resolution</p>
                                <p className="text-sm font-semibold">{photo.resolution}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {photo.tags?.map((tag, index) => (
                            <Chip key={index} size="sm" variant="bordered" className="text-zinc-500">
                                #{tag}
                            </Chip>
                        ))}
                    </div>

                    <Separator /> {/* এখানে Divider এর বদলে Separator */}

                    <div className="flex gap-3 mt-auto">
                        <Button color="primary" size="lg" className="flex-1 font-bold shadow-lg" startContent={<BiDownload size={20}/>}>
                            Download High Res
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetailsPage;