import { createContext, useContext, useState } from 'react';

type CreateMenuType = 'addEditReserve' | 'addUpdateRoom' | null;

type createMenuOption = '1' | '2' | '3' | '4' | null;

const CreateMenuContext = createContext<{
    activeMenu: CreateMenuType;
    openMenu: (type: CreateMenuType) => void;
    closeMenu: () => void;
    optionMenu: createMenuOption;
    optionId: (type: createMenuOption) => void;
} | null>(null);

export const CreateMenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeMenu, setActiveMenu] = useState<CreateMenuType>(null);

    const [optionMenu, setOptionMenu] = useState<createMenuOption>(null);

    return (
        <CreateMenuContext.Provider
            value={{
                activeMenu,
                openMenu: (type) => setActiveMenu(type),
                closeMenu: () => setActiveMenu(null),
                optionMenu,
                optionId: (type) => setOptionMenu(type)
            }}
        >
            {children}
        </CreateMenuContext.Provider>
    );
};

export const useCreateMenu = () => {
    const ctx = useContext(CreateMenuContext);
    if (!ctx) throw new Error('useCreateMenu must be used inside provider');
    return ctx;
};