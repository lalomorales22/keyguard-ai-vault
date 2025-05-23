
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CircleFadingPlus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ApiKeyCard from './ApiKeyCard';
import AnimatedApiCard from './AnimatedApiCard';
import ApiKeyForm from './ApiKeyForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

interface ApiKeyListProps {
  viewMode?: 'grid' | 'list';
  showEffects?: boolean;
}

const ApiKeyList = ({ viewMode = 'grid', showEffects = true }: ApiKeyListProps) => {
  const { apiKeys, selectedCategory, searchQuery } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Filter API keys based on selected category and search query
  const filteredApiKeys = apiKeys.filter((apiKey) => {
    const matchesCategory = !selectedCategory || apiKey.categoryId === selectedCategory;
    const matchesSearch = !searchQuery || 
      apiKey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apiKey.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };
  
  return (
    <>
      <div className="flex items-center justify-between py-1.5 px-3 border-b border-white/10">
        <h1 className="text-xs font-semibold">
          {selectedCategory 
            ? `${filteredApiKeys.length} API Key${filteredApiKeys.length !== 1 ? 's' : ''}`
            : 'All API Keys'}
        </h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          size="sm"
          className="bg-brand-purple hover:bg-brand-purple-dark h-6 text-xs"
        >
          <Plus className="mr-1 h-3 w-3" />
          New Key
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
        {filteredApiKeys.length > 0 ? (
          showEffects ? (
            <motion.div 
              className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 gap-2' : 'flex flex-col gap-2'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredApiKeys.map((apiKey) => (
                <AnimatedApiCard key={apiKey.id} apiKey={apiKey} />
              ))}
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 gap-2' : 'flex flex-col gap-2'}>
              {filteredApiKeys.map((apiKey) => (
                <ApiKeyCard key={apiKey.id} apiKey={apiKey} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center mb-2">
              {showEffects ? (
                <CircleFadingPlus className="h-4 w-4 text-brand-purple animate-pulse" />
              ) : (
                <Plus className="h-4 w-4 text-white/40" />
              )}
            </div>
            <h3 className="text-sm font-medium mb-1">No API Keys</h3>
            <p className="text-xs text-white/60 max-w-md mb-2">
              {searchQuery 
                ? "No API keys match your search query" 
                : "Add your first API key to get started"}
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              size="sm"
              className="bg-brand-purple hover:bg-brand-purple-dark h-6 text-xs"
            >
              <Plus className="mr-1 h-3 w-3" />
              Add API Key
            </Button>
          </div>
        )}
      </div>
      
      {/* Add API Key Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New API Key</DialogTitle>
          </DialogHeader>
          <ApiKeyForm onSubmit={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApiKeyList;
