library(ggplot2)
library(lme4)
library(hydroGOF)
library(dplyr)
library(lmerTest)
setwd("~/git/greek_adjectives/experiments/2-faultless-disagreement-greek/results/")
source("helpers.R")

d = read.csv("results.csv",header=T)
head(d)

d = d[d$language!="",]

unique(d$language)

length(unique(d$participant_id)) # n=35

aggregate(response~class,data=d,mean)
d_agr = aggregate(response~predicate,FUN=mean,data=d)

#d$class <- factor(d$class,levels=c("quality","size","age","texture","color","shape","nationality"))

## class plot
d_s = bootsSummary(data=d, measurevar="response", groupvars=c("class"))
# save data for aggregate plot
#write.csv(d_s,"~/Documents/git/cocolab/adjective_ordering/presentations/DGfS/plots/faultless.csv")
class_plot <- ggplot(d_s, aes(x=reorder(class,-response,mean),y=response)) +
  geom_bar(stat="identity",position=position_dodge()) +
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=reorder(class,-response,mean), width=0.1),position=position_dodge(width=0.9))+
  ylab("faultless disagreement\n")+
  xlab("\nadjective class") +
  ylim(0,1) +
  theme_bw()
class_plot
#ggsave("../results/class_plot.pdf",height=3)


#### comparison with faultless disgareement


o = read.csv("../../1-order-preference-greek/results/greek-naturalness-duplicated.csv",header=T)

o_agr = aggregate(correctresponse~predicate*correctclass,data=o,FUN=mean)

o_agr$subjectivity = d_agr$response[match(o_agr$predicate,d_agr$predicate)]

#### NO COLOR ADJECTIVES
#o_agr = o_agr[o_agr$correctclass!="color",]

gof(o_agr$correctresponse,o_agr$subjectivity)
# r = 0.81, r2 = 0.66
results <- boot(data=o_agr, statistic=rsq, R=10000, formula=correctresponse~subjectivity)
boot.ci(results, type="bca") 
# 95%   ( 0.4191,  0.8007 ) 

ggplot(o_agr, aes(x=subjectivity,y=correctresponse)) +
  geom_point() +
  #geom_smooth()+
  stat_smooth(method="lm",color="black")+
  #geom_text(aes(label=predicate),size=2.5,vjust=1.5)+
  ylab("preferred distance from noun\n")+
  xlab("\nsubjectivity score")+
  #ylim(0,1)+
  theme_bw()
#ggsave("../results/greek-scatter.pdf",height=2.75,width=3.15)
